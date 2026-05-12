# The Point — Signal Service Spec

**Purpose:** Collect behavioral events from deployed Point pages, aggregate them by vocabulary dimensions, and expose the aggregated signal back to the agent pipeline via `performance-index.json`. Closes Gap 4: real-world feedback into @blueprint's layout decisions.

**Scope:** Service API + CLI + tracking snippet + @blueprint integration. Does not include analytics dashboards, session replay, or user identification. Privacy-first: no PII collected, no cookies, no fingerprinting.

---

## Architecture

```
Deployed page
  → tracking snippet (event delegation on bp-* classes)
  → POST /events (open, rate-limited)
  → service database

CLI: the-point push {slug}
  → POST /builds (authenticated)
  → service database

CLI: the-point pull
  → GET /performance-index (authenticated)
  → writes performance-index.json locally

@blueprint Step 5
  → reads performance-index.json before layout decision
```

---

## Data Model

### Table: `builds`

| Column | Type | Notes |
|---|---|---|
| `id` | integer PK | auto |
| `slug` | varchar(128) | unique, indexed — e.g. "kakurega" |
| `layout_pattern` | varchar(64) | from vocabulary dimension 9 |
| `audience` | varchar(64) | derived from Q2/Q3 answers |
| `compositional_mode` | varchar(64) | from vocabulary dimension 11 |
| `image_strategy` | varchar(32) | photograph / mockup / gradient |
| `shape` | varchar(32) | sharp / soft / pill |
| `theme` | varchar(16) | light / dark / system |
| `vocabulary` | jsonb | full 11-dimension resolution table |
| `scout_findings` | jsonb | category conventions honored/subverted (nullable) |
| `built_at` | timestamptz | date @blueprint wrote the files |
| `pushed_at` | timestamptz | date CLI push ran |

### Table: `events`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint PK | auto |
| `slug` | varchar(128) | indexed, FK → builds.slug (loose — events may arrive before push) |
| `event_type` | varchar(32) | pageview / scroll / bp_click / form_submit |
| `data` | jsonb | event-specific payload (see Event Payloads below) |
| `created_at` | timestamptz | indexed |

**Event Payloads:**

```json
// pageview
{ "device": "mobile|desktop", "ref": "https://..." }

// scroll
{ "depth": 75 }

// bp_click
{ "classes": ["bp-btn", "bp-btn-primary"], "tag": "BUTTON", "text": "Send inquiry" }

// form_submit
{ "classes": ["bp-form"], "id": "inquiry" }
```

### Table: `annotations`

| Column | Type | Notes |
|---|---|---|
| `id` | integer PK | auto |
| `slug` | varchar(128) | indexed |
| `body` | text | human note — e.g. "Client closed deal 48hrs after launch" |
| `created_at` | timestamptz | |

### View: `pattern_performance`

Materialized or query-time aggregate. Refreshed on each `GET /performance-index` call (or on a schedule for large deployments).

```sql
SELECT
  b.layout_pattern,
  b.audience,
  b.compositional_mode,
  b.image_strategy,
  COUNT(DISTINCT b.slug)                                                        AS sample_count,
  COUNT(CASE WHEN e.event_type = 'pageview'    THEN 1 END)                      AS pageviews,
  COUNT(CASE WHEN e.event_type = 'form_submit' THEN 1 END)                      AS form_submits,
  COUNT(CASE WHEN e.event_type = 'bp_click'
             AND e.data->>'classes' ILIKE '%bp-btn-primary%' THEN 1 END)         AS primary_cta_clicks,
  ROUND(AVG(CASE WHEN e.event_type = 'scroll'
                 THEN (e.data->>'depth')::int END), 0)                           AS avg_scroll_depth_pct,
  ROUND(
    COUNT(CASE WHEN e.event_type = 'form_submit' THEN 1 END)::numeric
    / NULLIF(COUNT(CASE WHEN e.event_type = 'pageview' THEN 1 END), 0) * 100, 1
  )                                                                              AS conversion_rate_pct
FROM builds b
LEFT JOIN events e ON e.slug = b.slug
GROUP BY b.layout_pattern, b.audience, b.compositional_mode, b.image_strategy;
```

**Signal derivation from `conversion_rate_pct`:**

| conversion_rate_pct | signal |
|---|---|
| ≥ 20% | high |
| 10–19% | medium |
| < 10% | low |
| no form_submits tracked (pageview-only page) | use avg_scroll_depth_pct: ≥75 = medium, else low |

**Confidence derivation from `sample_count`:**

| sample_count | confidence |
|---|---|
| ≥ 10 | high |
| 3–9 | medium |
| < 3 | low |

---

## API Endpoints

**Base URL:** `https://api.the-point.design`
**Auth:** Bearer token in `Authorization` header for all authenticated endpoints. Open endpoints are rate-limited to 100 req/min per IP.

---

### `POST /events` — Open, rate-limited

Accept a behavioral event from a deployed page. No auth required.

**Request body:**
```json
{
  "slug": "kakurega",
  "event": "bp_click",
  "data": { "classes": ["bp-btn", "bp-btn-primary"], "tag": "BUTTON", "text": "Send inquiry" },
  "ts": 1746912000000
}
```

**Validation:**
- `slug`: required, varchar(128), alphanumeric + hyphens only
- `event`: required, must be one of: `pageview`, `scroll`, `bp_click`, `form_submit`
- `data`: required, valid JSON object, max 1KB
- `ts`: required, integer millisecond timestamp, must be within 24hrs of server time

**Response:** `202 Accepted` — no body. Never return 4xx for data issues; drop silently (prevents snippet errors surfacing to users).

**Rate limiting:** 100 events/min per IP. Excess requests: `429` with `Retry-After` header.

---

### `POST /builds` — Authenticated

Register a build's vocabulary metadata. Called by `the-point push`.

**Request body:**
```json
{
  "slug": "kakurega",
  "layout_pattern": "journal-sequential",
  "audience": "professional-inquiry",
  "compositional_mode": "atmospheric",
  "image_strategy": "photograph",
  "shape": "sharp",
  "theme": "light",
  "vocabulary": { "density": "airy", "weight": "light", "tracking": "wide", "motion": "surgical", "shape": "sharp", "depth": "flat", "theme": "light", "type_family": "display-serif", "layout_pattern": "journal-sequential", "image_strategy": "photograph", "compositional_mode": "atmospheric" },
  "scout_findings": { "category_conventions": ["heritage-craft: dark background dominant", "serif heading 4/5 examples"], "differentiation": "journal-sequential not found in any researched example" },
  "built_at": "2026-05-10"
}
```

**Behavior:** Upsert on `slug`. If slug already exists, update all fields and set `pushed_at = now()`.

**Response:** `201 Created` or `200 OK` (upsert), body:
```json
{ "slug": "kakurega", "pushed_at": "2026-05-10T14:23:00Z" }
```

**Errors:**
- `400` — missing required field or invalid vocabulary value
- `401` — missing or invalid auth token

---

### `POST /annotations` — Authenticated

Add a qualitative note to a build. Called by `the-point annotate`.

**Request body:**
```json
{ "slug": "kakurega", "body": "Chef submitted inquiry within 48hrs. Wholesale relationship opened." }
```

**Response:** `201 Created`
```json
{ "id": 12, "slug": "kakurega", "created_at": "2026-05-10T15:00:00Z" }
```

---

### `GET /performance-index` — Authenticated

Return aggregated signal data in the exact format of `performance-index.json`. This is what `the-point pull` calls.

**Response:** `200 OK`, content-type `application/json`

```json
{
  "_generated_at": "2026-05-10T15:00:00Z",
  "_comment": "Generated by Signal Service. Do not edit manually — run `the-point pull` to refresh.",
  "observations": [
    {
      "id": "kakurega-2026-05",
      "layout_pattern": "journal-sequential",
      "audience": "professional-inquiry",
      "compositional_mode": "atmospheric",
      "image_strategy": "photograph",
      "outcome_proxy": "form-completion",
      "signal": "medium",
      "confidence": "low",
      "sample_count": 1,
      "pageviews": 23,
      "form_submits": 6,
      "conversion_rate_pct": 26.1,
      "avg_scroll_depth_pct": 74,
      "annotations": ["Chef submitted inquiry within 48hrs. Wholesale relationship opened."],
      "notes": "Single build. Confidence will rise above low at sample_count ≥ 3."
    }
  ],
  "recommendations": {
    "journal-sequential": {
      "best_for": ["professional-inquiry", "heritage-craft"],
      "avoid_for": [],
      "notes": "Derived from signal data. Updated on pull."
    }
  }
}
```

**Behavior:** Computes from `pattern_performance` view at query time. `recommendations` block is computed as:
- `best_for`: patterns + audiences where `signal: high OR medium` AND `confidence: medium OR high`
- `avoid_for`: patterns + audiences where `signal: low` AND `confidence: high` (needs real data, not just few samples)

---

### `GET /builds/{slug}` — Authenticated

Full data for one build: metadata, all events summary, annotations.

**Response:** `200 OK`
```json
{
  "slug": "kakurega",
  "layout_pattern": "journal-sequential",
  "pushed_at": "2026-05-10T14:23:00Z",
  "events_summary": {
    "pageviews": 23,
    "form_submits": 6,
    "bp_clicks": 18,
    "avg_scroll_depth_pct": 74,
    "conversion_rate_pct": 26.1
  },
  "annotations": [
    { "body": "Chef submitted inquiry within 48hrs.", "created_at": "2026-05-10T15:00:00Z" }
  ]
}
```

---

## Tracking Snippet

@blueprint inserts this immediately before `</body>` in every HTML file it generates. Replace `{{slug}}` with the build slug at write time.

```html
<script>
(function(s,a){
  function send(e,d){navigator.sendBeacon(a,JSON.stringify({slug:s,event:e,data:d,ts:Date.now()}))}
  send('pageview',{device:navigator.maxTouchPoints>0?'mobile':'desktop',ref:document.referrer});
  var f={};
  window.addEventListener('scroll',function(){
    var p=Math.round((scrollY+innerHeight)/document.body.scrollHeight*100);
    [25,50,75,100].forEach(function(d){if(p>=d&&!f[d]){f[d]=1;send('scroll',{depth:d})}});
  },{passive:true});
  document.addEventListener('click',function(e){
    var el=e.target.closest('[class*="bp-"]');
    if(!el)return;
    if(!['A','BUTTON','INPUT','SELECT'].includes(el.tagName)&&el.getAttribute('role')!=='button')return;
    send('bp_click',{classes:[].filter.call(el.classList,function(c){return c.startsWith('bp-')}),tag:el.tagName,text:el.textContent.trim().slice(0,60)});
  });
  document.addEventListener('submit',function(e){
    send('form_submit',{classes:[].filter.call(e.target.classList,function(c){return c.startsWith('bp-')}),id:e.target.id||'form'});
  });
})('{{slug}}','https://api.the-point.design/events');
</script>
```

**Why wildcard on `[class*="bp-"]` instead of specific class names:**
Event delegation on `document` with `closest('[class*="bp-"]')` catches every interactive element with any `bp-` class — including components @forge creates in the future — without ever updating the snippet. One listener, zero maintenance surface.

**What is NOT tracked:** hover events, non-interactive elements (bp-section, bp-container, bp-card unless clicked as a button), keyboard-only interactions, viewport time. Scope is intentionally minimal — only definitive user actions.

---

## CLI — `the-point`

Config stored at `~/.the-point/config.json`:
```json
{
  "api_url": "https://api.the-point.design",
  "api_key": "tp_live_xxxx"
}
```

Or via env vars: `THE_POINT_API_URL`, `THE_POINT_API_KEY`.

---

### `the-point push <slug> [options]`

Register a build with the service. Run after @blueprint writes the files.

**Options:**
```
--layout     <pattern>    layout_pattern value (required)
--audience   <type>       audience type (required)
--mode       <mode>       compositional_mode (required)
--image      <strategy>   image_strategy (required)
--shape      <word>       shape vocabulary word (optional)
--theme      <word>       light|dark|system (optional)
--vocab      <path>       path to build-notes.md — parses vocabulary table automatically (alternative to individual flags)
--built-at   <date>       ISO date, defaults to today
```

**Example:**
```bash
the-point push kakurega --vocab examples/kakurega-build-notes.md
# or
the-point push kakurega --layout journal-sequential --audience professional-inquiry --mode atmospheric --image photograph
```

**Output:**
```
✓ kakurega registered (pushed_at: 2026-05-10T14:23:00Z)
```

**`--vocab` parsing:** reads the `## Vocabulary Resolution` table from build-notes.md and maps each row to the corresponding API field. Removes the need to manually pass all flags.

---

### `the-point pull`

Fetch aggregated performance data and overwrite local `data/performance-index.json`.

**Output:**
```
✓ performance-index.json updated
  23 observations across 7 layout patterns
  New since last pull: kakurega (journal-sequential, professional-inquiry, signal: medium)
```

**Behavior:** Always overwrites. The local file is a generated artifact, not a source of truth.

---

### `the-point annotate <slug> "<note>"`

Add a qualitative observation to a build.

```bash
the-point annotate kakurega "Client closed wholesale deal. 6 form submits from 23 sessions."
```

**Output:**
```
✓ annotation added to kakurega
```

---

### `the-point status <slug>`

Show all recorded data for one build.

**Output:**
```
kakurega
  Layout:     journal-sequential
  Audience:   professional-inquiry
  Pushed:     2026-05-10

  Events
    Pageviews:       23
    CTA clicks:      18
    Form submits:     6
    Avg scroll:      74%
    Conversion:     26.1%

  Signal:     medium  (confidence: low — sample_count: 1)

  Annotations
    [2026-05-10] Client closed wholesale deal. 6 form submits from 23 sessions.
```

---

### `the-point report <layout-pattern>`

Show aggregated signal across all builds using a given layout pattern.

```bash
the-point report journal-sequential
```

**Output:**
```
journal-sequential — 3 builds, 67 total sessions

Audience breakdown:
  professional-inquiry    conversion: 26.1%  signal: medium  confidence: low  (n=1)
  heritage-craft          conversion: 18.4%  signal: medium  confidence: low  (n=2)

Overall avg scroll depth: 71%
Annotations: 2
```

---

## @blueprint Integration

### Tracking snippet insertion

In the HTML generation step, immediately before `</body>`, insert the tracking snippet with `{{slug}}` replaced by the build slug. This is a hard constraint — same level as base stylesheet path.

Add to blueprint.md Hard Constraints:
> 8. **Always insert the Signal Service tracking snippet before `</body>`** — replace `{{slug}}` with the build slug. The snippet is in `specs/signal-service.md`. Without it, no behavioral data flows to the performance index and the system cannot learn from this build.

### `the-point push` after build

At the end of the terminal clean-build report (Step D), add:

```
To register this build with the Signal Service:
  the-point push {{slug}} --vocab examples/{{slug}}-build-notes.md
```

This is a manual step — the agent cannot run shell commands — but is surfaced explicitly so it doesn't get missed.

### `the-point pull` before layout decision

At the start of Step 5 (layout pattern), add:

```
Before reading performance-index.json, ensure it is current:
  the-point pull
If the CLI is not available or returns an error, proceed with the existing local file.
```

---

## Authentication Model

**Tracking snippet → `POST /events`:** No auth. Rate-limited by IP. Slug is the only identifier — no secrets in client-side JS.

**CLI → all other endpoints:** Bearer token in `Authorization: Bearer tp_live_xxxx` header. Token provisioned at account creation, stored in `~/.the-point/config.json`.

**Why no auth on events:** The events endpoint is public because the tracking snippet runs in the browser. An attacker could POST fake events to any slug they know — this is acceptable because the data informs layout preferences (low-stakes decisions), not billing or access control. Outlier detection (if a slug receives 10,000 pageviews in 60 seconds, flag the data as unreliable) is sufficient protection.

---

## Deployment Requirements

- **Database:** PostgreSQL ≥ 14 (jsonb support, window functions for aggregation)
- **API runtime:** Any — Rails API, Sinatra, FastAPI, or Express all fit the endpoint surface
- **`POST /events` throughput:** Must handle burst writes without blocking — use async job queue (Sidekiq, Celery, BullMQ) to write events; the endpoint returns `202` immediately
- **`GET /performance-index`:** Acceptable to be slow (≤ 2s) — called by CLI, not browser
- **No sessions, no cookies, no user table** — stateless by design
- **CORS:** `POST /events` must allow `*` origin (browser snippet); all other endpoints `Access-Control-Allow-Origin: cli-only` (no browser access)

---

## What This Spec Does Not Cover

- Analytics dashboard (visualize event data for humans)
- A/B variant routing (serve different layouts to different sessions)
- Session recording or heatmaps
- User identification or cohort analysis
- Webhook push from service to agent pipeline (polling via CLI pull is sufficient for v1)

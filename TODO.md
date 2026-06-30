# The Point — Plugin Issues

## Critical (breaks the plugin)

### 1. `plugin.json` missing agent/command/skill declarations
`plugin.json` only contains `name`, `version`, `description`, `author`, `keywords`. It has no `agents`, `commands`, or `skills` arrays. The Claude Code harness cannot discover or load any agent, command, or skill without these declarations. Nothing is wired up.

Fix: add arrays registering each agent file and command file.

### 2. Four agents have no command file
`blueprint` and `artisan` have corresponding `commands/` files. These four do not:
- `agents/forge.md` → needs `commands/forge.md`
- `agents/review.md` → needs `commands/review.md`
- `agents/copy.md` → needs `commands/copy.md`
- `agents/scout.md` → needs `commands/scout.md`

Users cannot invoke forge, review, copy, or scout via slash command.

### 3. `@copy` autonomous pipeline blocking question
`agents/copy.md` Step 3 asks the user interactively: "Do you have customers?" This works when a human invokes copy directly. It breaks when `@blueprint` invokes `@copy` autonomously at the end of the build pipeline — the pipeline stalls waiting for a human response that never comes.

Fix: add a conditional at the top of copy.md — if invoked with a full brief (brand name, tone, content blocks) present in the invocation context, skip the interview and proceed directly to Branch A or B based on context signals.

### 4. Path hardcoding `~/.claude/plugins/the-point/`
Every agent file references files via `~/.claude/plugins/the-point/agents/blueprint.md`, `~/.claude/plugins/the-point/llm.md`, etc. If the plugin is installed anywhere else, all cross-references break.

Fix: resolve paths relative to the plugin root as declared in `plugin.json`.

---

## Secondary (design and consistency issues)

### 5. `data-bp-theme="auto"` vs `"system"` inconsistency
`llm.md` documents `data-bp-theme="auto"` for the system/OS-preference theme. `skills/blueprint-vocabulary.md` and the built examples use `"system"`. Pick one and standardize across all documents.

### 6. Scout/synthesis race condition
`agents/blueprint.md` fires `@scout` as a background Task after Q1, then proceeds through Q2–Q8 and into synthesis. Synthesis Step 2 references scout output, but there is no explicit wait or check that the scout Task has completed before synthesis begins. On fast users or slow network, scout may not be done.

Fix: add a scout-wait gate before synthesis Step 2 — check if the scout output file exists and has content, otherwise wait briefly or note that scout is still running.

### 7. Artisan screenshot step — no browser tool declared
`agents/artisan.md` Step 5 requires taking a browser screenshot at port 7744. The agent definition does not declare a browser tool requirement. In environments where screenshot tools aren't available, the step will fail silently or with a confusing error.

Fix: add a note to artisan.md about required tool availability, or add a graceful fallback when the screenshot step fails.

### 8. Copy keyword derivation may diverge from blueprint's image keywords
`agents/copy.md` derives LoremFlickr/Picsum image URLs from prose keywords after writing copy. `agents/blueprint.md` has its own image keyword rules (unique per section, derived from content context). These two systems operate independently and can produce divergent keyword sets for the same page.

Fix: when `@blueprint` invokes `@copy`, pass the image subject hints from the blueprint synthesis so copy uses the same keyword vocabulary.

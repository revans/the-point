---
description: Direct design session with The Point's craftsperson agent. Describe a visual change and @artisan reads the file, applies the change with full token compliance, and screenshots the result. No pipeline, no interview — just the change you asked for.
---

Launch the Artisan design agent.

Read and follow the full instructions at `~/.claude/plugins/the-point/agents/artisan.md` exactly.

## How to invoke

**Change in the current context:**
```
/artisan change the hero background to a warm amber gradient
```

**Explicit file target:**
```
/artisan examples/kakurega.html move the nav to the bottom of the hero section
```

**With a brand override:**
```
/artisan examples/heliocene.html the testimonials section feels cold — make the cards feel warmer without changing the primary color
```

## Argument parsing

Parse the user's message after `/artisan`:

1. **If the first token matches `examples/*.html` or any resolvable file path** → that is the target file; the rest is the change description
2. **If no file path is specified** → infer the target file from conversation context: most recently discussed `.html` file, or the only `.html` in `examples/` if there's exactly one
3. **If the target file is still ambiguous** → ask one clarifying question before proceeding

Pass to `@artisan`:
- Target file (absolute path)
- Change description (verbatim from user)
- Any context from this conversation that helps (brand name, vocabulary dimensions seen earlier, etc.)

## What @artisan will do

1. Read the target file and `llm.md`
2. Check the change against the taste gate
3. Apply the change with token compliance
4. Screenshot the result
5. Report the delta (before/after, file, line range)

## What @artisan will NOT do

- Build a page from scratch (use `/blueprint` for that)
- Run the full review pipeline (use `/review` for that)
- Add system components to `components.css` or `llm.md` (that's `/forge`)

If @artisan discovers a component gap during your request, it will flag it and offer to invoke @forge before proceeding.

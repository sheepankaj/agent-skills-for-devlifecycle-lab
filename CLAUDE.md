# CLAUDE.md — Agent Guidance for agent-skills-for-devlifecycle-lab

This file tells AI agents how to work in this repository. Read it before touching any code.

---

## What This Project Is

A Node.js CLI task manager built as a **practice project** for the full development lifecycle. The application itself is a vehicle — the real goal is learning the `spec → plan → build → test → review → simplify → ship` workflow using the [agent-skills](https://github.com/addyosmani/agent-skills) framework.

---

## Commands

```bash
# Run the app
node src/index.js add "Task description"
node src/index.js list
node src/index.js done <id>
node src/index.js delete <id>

# Tests
npm test                  # all tests (passWithNoTests)
npm run test:coverage     # with coverage report

# Install (if starting fresh)
npm install
```

---

## Architecture

Three files. Dependencies flow one way — no circular imports.

```
src/storage.js   ← file I/O only. loadTasks() and saveTasks(). No logic.
src/tasks.js     ← pure functions only. No file I/O. Takes data in, returns new data.
src/index.js     ← CLI entry. Parses process.argv, calls storage + tasks, prints output.
```

**Key invariant:** `tasks.js` must remain pure — no `fs`, no `path`, no side effects. All I/O stays in `storage.js`. Validate inputs in `index.js`, not in `tasks.js`.

---

## Code Style

- CommonJS (`require`/`module.exports`) — do not switch to ESM
- Plain functions, no classes
- `camelCase` for all variables and functions
- Full words — no abbreviations (`description` not `desc`, `tasks` not `t` in outer scope)
- No inline comments unless the WHY is non-obvious

```js
// Good — pure function, descriptive name, no mutation
function addTask(tasks, description) {
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  return [...tasks, { id, description, done: false, createdAt: new Date().toISOString() }];
}
```

---

## Testing

- **Framework:** Jest
- **Location:** `tests/` mirroring `src/`
- **Coverage target:** 80% minimum (currently at 100% lines/statements/functions)
- **Rule:** Test behavior, not implementation. Assert outputs, not which internal methods were called.
- **Storage tests:** use a temp file path (`os.tmpdir()`), never the real `data/tasks.json`
- **Tasks tests:** pass plain arrays in, assert on the returned array — no file I/O needed

```bash
npm test           # must pass before every commit
```

---

## Boundaries

**Always:**
- Run `npm test` before considering any change done
- Keep `tasks.js` pure — no I/O
- Validate user input at `index.js`, never inside `tasks.js` or `storage.js`
- Write a failing test before writing implementation (TDD)

**Ask first:**
- Adding any npm dependency
- Changing the `tasks.json` schema (id, description, done, createdAt)
- Adding a new command not in the spec
- Changing the module system (CommonJS → ESM)

**Never:**
- Commit `data/tasks.json` — it is git-ignored for a reason
- Delete or skip a failing test to make the suite green
- Mix storage logic into task logic or vice versa
- Add abstractions for hypothetical future use — build for the current spec

---

## Skills Available

This project has 25 agent-skills installed in `.agents/skills/`. When starting a new feature or task, check which skill applies:

| Task type | Skill to use |
|---|---|
| New feature or change | `spec-driven-development` → `planning-and-task-breakdown` |
| Writing code | `incremental-implementation` + `test-driven-development` |
| Before merging | `code-review-and-quality` |
| Refactoring | `code-simplification` |
| Deploying | `shipping-and-launch` |
| Debugging | `debugging-and-error-recovery` |
| Unsure which skill | `using-agent-skills` |

Do not skip the spec or plan phases — they exist to surface misunderstandings before code is written.

---

## Project Files

| File | Purpose |
|---|---|
| `SPEC.md` | Approved specification — source of truth for requirements |
| `tasks/plan.md` | Implementation plan with architecture decisions |
| `tasks/todo.md` | Task checklist with acceptance criteria |
| `README.md` | Human-facing project overview and future perspectives |
| `CLAUDE.md` | This file — AI agent guidance |
| `skills-lock.json` | Pins the installed agent-skills versions |
| `.agents/skills/` | The 25 installed skill files |

---

## Data Format

`data/tasks.json` is an array of task objects:

```json
[
  {
    "id": 1,
    "description": "Buy milk",
    "done": false,
    "createdAt": "2026-10-23T05:30:00.000Z"
  }
]
```

Do not change this schema without updating the spec first and asking.

---

## History

This project was built in a single session, going through all 7 lifecycle phases with Claude Code and the agent-skills framework. The commit history reflects the completed v1.0.0 lifecycle. New features should each begin a fresh `spec → plan → build → test → review → simplify → ship` cycle.

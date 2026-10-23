# Implementation Plan: Task Manager CLI

## Overview

Build a 4-command Node.js CLI task manager (`add`, `list`, `done`, `delete`)
with JSON file persistence. Three source files: `storage.js` (file I/O),
`tasks.js` (pure logic), `index.js` (CLI entry). Tests in `tests/` with Jest.

## Architecture Decisions

- **Pure functions in tasks.js** — task logic takes data in, returns new data out.
  No side effects. Makes unit testing trivial without mocking.
- **Storage isolated in storage.js** — all `fs` calls live here only. Keeps the
  rest of the codebase I/O-free and testable.
- **No CLI framework** — plain `process.argv` keeps the dependency count at zero
  and forces us to understand parsing basics.
- **Auto-increment IDs** — max(existing ids) + 1. Simple, human-readable in output.

## Task List

### Phase 1: Foundation

- [ ] Task 1: Project setup
- [ ] Task 2: storage.js — loadTasks and saveTasks with tests

### Checkpoint: Foundation
- [ ] `npm test` passes (even if only storage tests exist)
- [ ] `data/tasks.json` is in `.gitignore`

### Phase 2: Core Logic

- [ ] Task 3: tasks.js — addTask and listTasks with tests
- [ ] Task 4: tasks.js — completeTask and deleteTask with tests

### Checkpoint: Core Logic
- [ ] `npm test` passes, coverage >= 80% on tasks.js
- [ ] All task functions behave correctly on edge cases (empty list, bad ID)

### Phase 3: CLI

- [ ] Task 5: index.js — `add` and `list` commands
- [ ] Task 6: index.js — `done`, `delete`, error handling, usage message

### Checkpoint: Complete
- [ ] All 4 commands work end-to-end in terminal
- [ ] Tasks persist after process restarts
- [ ] `npm test -- --coverage` passes at >= 80%
- [ ] Ready for /review

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| tasks.json corrupted/missing | Med | loadTasks returns [] on ENOENT; throw on corrupt JSON |
| Duplicate IDs on concurrent writes | Low | Single-user local tool; out of scope |
| ID not found for done/delete | Med | Validate ID exists before mutating; print clear error |

## Open Questions

- None. Spec is fully approved.

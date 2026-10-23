# Spec: Task Manager CLI

## Objective

A command-line task manager for personal use on a local machine. The user can
add tasks, list them, mark them done, and delete them. All data persists
between sessions via a local JSON file.

**User:** A single developer using their terminal day-to-day.

**Why:** Practice the full spec → plan → build → test → review → simplify → ship
development lifecycle using the agent-skills framework.

**Success looks like:** Running `node src/index.js add "Buy milk"` saves a task,
`node src/index.js list` shows it, `node src/index.js done 1` marks it complete,
and all of this survives a terminal restart.

## Tech Stack

- Runtime: Node.js 18+
- Language: JavaScript (CommonJS)
- Storage: JSON file (`data/tasks.json`)
- Testing: Jest
- No third-party CLI framework — plain `process.argv` parsing

## Commands

```bash
# Add a task
node src/index.js add "Task description"

# List all tasks (pending + done)
node src/index.js list

# Mark a task as done by ID
node src/index.js done <id>

# Delete a task by ID
node src/index.js delete <id>

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
agent-skills-for-devlifecycle-lab/
├── src/
│   ├── index.js        ← CLI entry point, argument parsing
│   ├── tasks.js        ← Task CRUD logic
│   └── storage.js      ← Read/write tasks.json
├── tests/
│   ├── tasks.test.js   ← Unit tests for task logic
│   └── storage.test.js ← Unit tests for storage
├── data/
│   └── tasks.json      ← Persisted task data (git-ignored)
├── tasks/
│   ├── SPEC.md         ← This file (moved here after approval)
│   └── todo.md         ← Implementation task list
├── package.json
└── .gitignore
```

## Code Style

Plain functions, no classes. Each module exports named functions.

```js
// tasks.js — example style
function addTask(tasks, description) {
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  return [...tasks, { id, description, done: false, createdAt: new Date().toISOString() }];
}

module.exports = { addTask };
```

- `camelCase` for variables and functions
- Descriptive names — no abbreviations (`description` not `desc`)
- Pure functions where possible (tasks.js takes data in, returns new data out)
- No inline comments unless logic is non-obvious

## Testing Strategy

- **Framework:** Jest
- **Test location:** `tests/` directory, mirroring `src/`
- **Coverage target:** 80% line coverage minimum
- **What to test:**
  - `tasks.js` — unit test every function with plain data (no file I/O)
  - `storage.js` — unit test with a temp file or mocked `fs`
  - `index.js` — not unit tested directly; covered by integration via tasks + storage
- **What not to test:** `console.log` output format (too brittle)

## Boundaries

- **Always:**
  - Run `npm test` before considering any phase complete
  - Keep task logic (tasks.js) pure — no file I/O inside it
  - Validate user input at the CLI boundary (index.js), not inside tasks.js

- **Ask first:**
  - Adding any npm dependency
  - Changing the tasks.json schema
  - Adding a new command not listed in this spec

- **Never:**
  - Commit `data/tasks.json` to git
  - Delete or skip a failing test to make CI pass
  - Mix storage logic into task logic

## Success Criteria

- [ ] `add "Buy milk"` creates a task with an auto-incremented ID
- [ ] `list` displays all tasks with ID, status ([ ] or [x]), and description
- [ ] `done 1` marks task ID 1 as complete; subsequent `list` shows it as [x]
- [ ] `delete 1` removes task ID 1; it no longer appears in `list`
- [ ] Tasks persist after the process exits and is restarted
- [ ] Invalid commands print a usage message and exit with code 1
- [ ] All tests pass with `npm test`
- [ ] Coverage >= 80%

## Open Questions

- None at this time. All assumptions confirmed before writing this spec.

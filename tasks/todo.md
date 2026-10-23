# Task List: Task Manager CLI

## Phase 1: Foundation

### Task 1: Project setup
**Description:** Configure Jest, add `.gitignore`, create folder structure, and
wire up npm scripts so `npm test` works before any source files exist.

**Acceptance criteria:**
- [ ] `npm test` runs Jest without errors (0 tests is fine at this point)
- [ ] `data/` and `tests/` directories exist
- [ ] `data/tasks.json` is listed in `.gitignore`
- [ ] `package.json` has `"test": "jest"` and `"test:coverage": "jest --coverage"` scripts

**Verification:**
- [ ] Run `npm test` — exits 0
- [ ] Run `git status` — `data/` is not tracked

**Dependencies:** None

**Files likely touched:**
- `package.json`
- `.gitignore`
- `data/.gitkeep`
- `tests/` (create empty dir)

**Estimated scope:** XS

---

### Task 2: storage.js — loadTasks and saveTasks with tests
**Description:** Implement `loadTasks()` and `saveTasks(tasks)`. `loadTasks`
reads `data/tasks.json` and returns the array; returns `[]` when the file does
not exist. `saveTasks` writes the array back. Write unit tests using a temp
file path.

**Acceptance criteria:**
- [ ] `loadTasks()` returns `[]` when file does not exist (ENOENT)
- [ ] `loadTasks()` returns the parsed array when file exists
- [ ] `saveTasks(tasks)` writes valid JSON to the file
- [ ] Round-trip: save then load returns the same data

**Verification:**
- [ ] `npm test` — storage tests pass

**Dependencies:** Task 1

**Files likely touched:**
- `src/storage.js`
- `tests/storage.test.js`

**Estimated scope:** S

---

### CHECKPOINT: After Tasks 1-2
- [ ] `npm test` passes
- [ ] `data/tasks.json` absent from git tracking

---

## Phase 2: Core Logic

### Task 3: tasks.js — addTask and listTasks with tests
**Description:** Implement `addTask(tasks, description)` which returns a new
array with a task appended (auto-incremented ID, `done: false`, `createdAt`
ISO string). Implement `listTasks(tasks)` which returns the array as-is (used
for display). Write unit tests for both.

**Acceptance criteria:**
- [ ] `addTask([], "Buy milk")` returns `[{ id: 1, description: "Buy milk", done: false, createdAt: <iso> }]`
- [ ] `addTask` on existing tasks auto-increments from the current max ID
- [ ] `addTask` does not mutate the input array
- [ ] `listTasks` returns the same array reference (passthrough)

**Verification:**
- [ ] `npm test` — all tests pass

**Dependencies:** Task 1 (Jest configured)

**Files likely touched:**
- `src/tasks.js`
- `tests/tasks.test.js`

**Estimated scope:** S

---

### Task 4: tasks.js — completeTask and deleteTask with tests
**Description:** Implement `completeTask(tasks, id)` which returns a new array
with the matching task's `done` set to `true`. Implement `deleteTask(tasks, id)`
which returns a new array with the matching task removed. Both should throw a
descriptive error if the ID does not exist.

**Acceptance criteria:**
- [ ] `completeTask` sets `done: true` on the correct task
- [ ] `completeTask` does not mutate the input array
- [ ] `deleteTask` removes the correct task by ID
- [ ] `deleteTask` does not mutate the input array
- [ ] Both throw `Error('Task <id> not found')` for a missing ID

**Verification:**
- [ ] `npm test` — all tests pass
- [ ] `npm test -- --coverage` — tasks.js coverage >= 80%

**Dependencies:** Task 3 (tasks.js exists)

**Files likely touched:**
- `src/tasks.js`
- `tests/tasks.test.js`

**Estimated scope:** S

---

### CHECKPOINT: After Tasks 3-4
- [ ] `npm test` passes
- [ ] tasks.js coverage >= 80%
- [ ] Edge cases covered: empty list, bad ID

---

## Phase 3: CLI

### Task 5: index.js — `add` and `list` commands
**Description:** Wire up `process.argv` parsing for `add` and `list`. `add`
loads tasks, calls `addTask`, saves, and prints confirmation. `list` loads
tasks and prints each with ID, status indicator (`[ ]` or `[x]`), and
description.

**Acceptance criteria:**
- [ ] `node src/index.js add "Buy milk"` prints `Added task #1: Buy milk`
- [ ] `node src/index.js list` shows all tasks formatted as `[1] [ ] Buy milk`
- [ ] `node src/index.js list` on empty list prints `No tasks yet.`
- [ ] Task persists: running `list` after `add` in a new process shows the task

**Verification:**
- [ ] Manual: run `add` then `list` in terminal, verify output and persistence
- [ ] `npm test` still passes

**Dependencies:** Tasks 2, 3

**Files likely touched:**
- `src/index.js`

**Estimated scope:** S

---

### Task 6: index.js — `done`, `delete`, error handling, usage message
**Description:** Add `done <id>` and `delete <id>` commands. Add a usage
message for unknown commands. Handle errors from tasks.js (task not found)
gracefully — print the error message and exit with code 1.

**Acceptance criteria:**
- [ ] `node src/index.js done 1` marks task 1 done; `list` shows `[x]`
- [ ] `node src/index.js delete 1` removes task 1; it no longer appears in `list`
- [ ] `node src/index.js done 99` prints `Error: Task 99 not found` and exits 1
- [ ] `node src/index.js` (no args) prints usage and exits 1
- [ ] `node src/index.js unknown` prints usage and exits 1

**Verification:**
- [ ] Manual: run all 4 commands end-to-end in terminal
- [ ] Manual: test error cases (bad ID, no args)
- [ ] `npm test -- --coverage` >= 80% overall

**Dependencies:** Task 4, Task 5

**Files likely touched:**
- `src/index.js`

**Estimated scope:** S

---

### CHECKPOINT: Complete
- [ ] All 4 commands work end-to-end
- [ ] Tasks persist after process restarts
- [ ] `npm test -- --coverage` passes at >= 80%
- [ ] Invalid inputs handled gracefully
- [ ] Ready to proceed to /review

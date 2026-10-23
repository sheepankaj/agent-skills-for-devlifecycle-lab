# agent-skills-for-devlifecycle-lab

A personal practice project built to experience the **full software development lifecycle** hands-on — from specification to shipping — using the [agent-skills](https://github.com/addyosmani/agent-skills) framework by [Addy Osmani](https://github.com/addyosmani).

---

## What This Project Is

This is not just a task manager. It is a **learning lab** — a real, working Node.js CLI application built by deliberately following every phase of a production-grade development workflow:

```
/spec → /plan → /build → /test → /review → /code-simplify → /ship
```

Each phase was guided by a skill from the `agent-skills` framework, giving practical, hands-on experience with the kind of structured engineering process that senior developers follow on real teams.

---

## The Application: Task Manager CLI

A command-line task manager for personal use. Tasks persist across sessions via a local JSON file.

### Installation

```bash
git clone <this-repo>
cd agent-skills-for-devlifecycle-lab
npm install
```

### Usage

```bash
# Add a task
node src/index.js add "Buy milk"

# List all tasks
node src/index.js list

# Mark a task as done
node src/index.js done 1

# Delete a task
node src/index.js delete 1
```

### Output example

```
[1] [x] Buy milk
[2] [ ] Walk the dog
[3] [ ] Read a book
```

### Run tests

```bash
npm test                  # run all tests
npm run test:coverage     # run with coverage report
```

---

## Project Structure

```
agent-skills-for-devlifecycle-lab/
├── src/
│   ├── index.js        ← CLI entry point, argument parsing
│   ├── tasks.js        ← Pure CRUD logic (no I/O)
│   └── storage.js      ← Reads/writes data/tasks.json
├── tests/
│   ├── tasks.test.js   ← 11 unit tests for task logic
│   └── storage.test.js ← 4 unit tests for storage
├── data/
│   └── tasks.json      ← Persisted task data (git-ignored)
├── tasks/
│   ├── plan.md         ← Implementation plan
│   └── todo.md         ← Task breakdown
├── .agents/skills/     ← 25 agent-skills installed
├── SPEC.md             ← Project specification
└── CLAUDE.md           ← AI agent guidance for this repo
```

---

## The Development Lifecycle Used

### Phase 1 — `/spec` (Spec-Driven Development)
Wrote a structured specification covering objective, tech stack, commands, project structure, code style, testing strategy, boundaries, and success criteria — **before writing a single line of code**.

### Phase 2 — `/plan` (Planning and Task Breakdown)
Mapped the dependency graph (`storage → tasks → index`), sliced the work into 6 small, verifiable tasks, and defined acceptance criteria and verification steps for each.

### Phase 3 — `/build` (Incremental Implementation)
Built one slice at a time following the TDD red→green loop. Each increment was individually tested before moving to the next. No more than ~50 lines written without running the test suite.

### Phase 4 — `/test` (Test-Driven Development)
Audited coverage gaps after building. Found and closed two uncovered paths: corrupt JSON handling in `storage.js` and the non-matching branch in `completeTask`. Reached **100% line, statement, and function coverage**.

### Phase 5 — `/review` (Code Review and Quality)
Five-axis review: correctness, readability, architecture, security, performance. Found two nits — a passthrough function adding indirection and an awkward array access — flagged for the simplify phase.

### Phase 6 — `/code-simplify` (Code Simplification)
Removed the `listTasks` passthrough (it returned its input unchanged), simplified the new-task ID extraction to a named variable. Behavior unchanged, code easier to read.

### Phase 7 — `/ship` (Shipping and Launch)
Pre-launch checklist: all tests passing, `npm audit` showing 0 vulnerabilities, no debug statements, shebang and `bin` entry added for proper CLI installability, committed as `v1.0.0`.

---

## Test Coverage

```
File        | % Stmts | % Branch | % Funcs | % Lines
------------|---------|----------|---------|--------
storage.js  |     100 |       50 |     100 |    100
tasks.js    |     100 |      100 |     100 |    100
All files   |     100 |    83.33 |     100 |    100
```

Remaining branch gap: JavaScript default parameter syntax in `storage.js` — not application logic, not worth testing.

---

## Future Perspectives

This project's lifecycle is complete at v1.0.0. Here are natural next steps if you want to continue practicing:

### Feature ideas (each is a full `/spec → /ship` cycle)
- **Due dates** — add an optional `--due` flag to `add`, display urgency in `list`
- **Priority levels** — `--priority high/medium/low`, sort `list` by priority
- **Filter and search** — `task-cli list --done`, `task-cli list --pending`, `task-cli search "milk"`
- **Edit a task** — `task-cli edit 1 "Updated description"`
- **Tags/categories** — `task-cli add "Buy milk" --tag shopping`
- **Export** — `task-cli export --format csv` or `--format markdown`

### Technical improvements
- Move from `process.argv` to a CLI framework like [commander](https://github.com/tj/commander.js) or [yargs](https://yargs.js.org/) — good `/spec` + `/plan` exercise
- Add TypeScript — a `deprecation-and-migration` skill exercise
- Add a CI pipeline (GitHub Actions) — a `ci-cd-and-automation` skill exercise
- Add structured logging — an `observability-and-instrumentation` skill exercise
- Security hardening review — a `security-and-hardening` skill exercise

### Other skills to practice
The `.agents/skills/` directory has 25 skills — 18 were not used in this project. Good ones to try next:
- `/doubt-driven-development` — adversarial review of your own assumptions
- `/api-and-interface-design` — if you add an HTTP API layer
- `/git-workflow-and-versioning` — structured branching and semantic versioning
- `/documentation-and-adrs` — writing architecture decision records

---

## Gratitude

A heartfelt thank you to **[Addy Osmani](https://github.com/addyosmani)** for creating and open-sourcing the [agent-skills](https://github.com/addyosmani/agent-skills) framework.

The agent-skills project encodes something genuinely valuable: **the process matters as much as the output.** By giving AI coding agents a structured set of lifecycle skills — grounded in real engineering practices from books like *Software Engineering at Google* — Addy has made it possible for developers to learn and practice production-grade workflows in a practical, hands-on way.

The quality of thinking behind each skill — the anti-rationalization tables, the red flags, the verification checklists, the "process, not prose" philosophy — reflects deep experience and care for the craft of software engineering. This project would not exist without that work.

If you found this practice project useful, go give the [agent-skills repo](https://github.com/addyosmani/agent-skills) a star. It deserves it.

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Language:** JavaScript (CommonJS)
- **Testing:** Jest 30
- **Storage:** JSON file (`data/tasks.json`)
- **No framework** — plain `process.argv` parsing

## License

ISC

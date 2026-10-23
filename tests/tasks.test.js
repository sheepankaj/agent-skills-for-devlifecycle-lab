const { addTask, completeTask, deleteTask } = require('../src/tasks');

// --- addTask ---

test('addTask on empty list creates task with id 1', () => {
  const result = addTask([], 'Buy milk');
  expect(result).toHaveLength(1);
  expect(result[0]).toMatchObject({ id: 1, description: 'Buy milk', done: false });
  expect(result[0].createdAt).toBeDefined();
});

test('addTask auto-increments from current max id', () => {
  const existing = [{ id: 3, description: 'Old task', done: false, createdAt: '' }];
  const result = addTask(existing, 'New task');
  expect(result[1].id).toBe(4);
});

test('addTask does not mutate the input array', () => {
  const original = [];
  addTask(original, 'Buy milk');
  expect(original).toHaveLength(0);
});

// --- completeTask ---

test('completeTask sets done to true on matching id', () => {
  const tasks = [{ id: 1, description: 'Buy milk', done: false, createdAt: '' }];
  const result = completeTask(tasks, 1);
  expect(result[0].done).toBe(true);
});

test('completeTask does not mutate the input array', () => {
  const tasks = [{ id: 1, description: 'Buy milk', done: false, createdAt: '' }];
  completeTask(tasks, 1);
  expect(tasks[0].done).toBe(false);
});

test('completeTask throws when id not found', () => {
  expect(() => completeTask([], 99)).toThrow('Task 99 not found');
});

test('completeTask leaves non-matching tasks unchanged', () => {
  const tasks = [
    { id: 1, description: 'Buy milk', done: false, createdAt: '' },
    { id: 2, description: 'Walk dog', done: false, createdAt: '' },
  ];
  const result = completeTask(tasks, 1);
  expect(result[1].done).toBe(false);
});

// --- deleteTask ---

test('deleteTask removes the task with matching id', () => {
  const tasks = [
    { id: 1, description: 'Buy milk', done: false, createdAt: '' },
    { id: 2, description: 'Walk dog', done: false, createdAt: '' },
  ];
  const result = deleteTask(tasks, 1);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(2);
});

test('deleteTask does not mutate the input array', () => {
  const tasks = [{ id: 1, description: 'Buy milk', done: false, createdAt: '' }];
  deleteTask(tasks, 1);
  expect(tasks).toHaveLength(1);
});

test('deleteTask throws when id not found', () => {
  expect(() => deleteTask([], 99)).toThrow('Task 99 not found');
});

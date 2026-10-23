const fs = require('fs');
const path = require('path');
const os = require('os');
const { loadTasks, saveTasks } = require('../src/storage');

let tempFile;

beforeEach(() => {
  tempFile = path.join(os.tmpdir(), `tasks-test-${Date.now()}.json`);
});

afterEach(() => {
  if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
});

test('loadTasks returns [] when file does not exist', () => {
  const tasks = loadTasks(tempFile);
  expect(tasks).toEqual([]);
});

test('saveTasks writes valid JSON to the file', () => {
  const tasks = [{ id: 1, description: 'Buy milk', done: false }];
  saveTasks(tasks, tempFile);
  const raw = fs.readFileSync(tempFile, 'utf8');
  expect(JSON.parse(raw)).toEqual(tasks);
});

test('round-trip: save then load returns the same data', () => {
  const tasks = [
    { id: 1, description: 'Buy milk', done: false },
    { id: 2, description: 'Walk dog', done: true },
  ];
  saveTasks(tasks, tempFile);
  expect(loadTasks(tempFile)).toEqual(tasks);
});

test('loadTasks throws when file contains corrupt JSON', () => {
  fs.writeFileSync(tempFile, 'not valid json', 'utf8');
  expect(() => loadTasks(tempFile)).toThrow(SyntaxError);
});

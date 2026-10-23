const fs = require('fs');
const path = require('path');

const DEFAULT_PATH = path.join(__dirname, '..', 'data', 'tasks.json');

function loadTasks(filePath = DEFAULT_PATH) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

function saveTasks(tasks, filePath = DEFAULT_PATH) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8');
}

module.exports = { loadTasks, saveTasks };

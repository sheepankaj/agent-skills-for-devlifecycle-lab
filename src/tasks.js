function addTask(tasks, description) {
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  return [...tasks, { id, description, done: false, createdAt: new Date().toISOString() }];
}

function completeTask(tasks, id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error(`Task ${id} not found`);
  return tasks.map(t => (t.id === id ? { ...t, done: true } : t));
}

function deleteTask(tasks, id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error(`Task ${id} not found`);
  return tasks.filter(t => t.id !== id);
}

module.exports = { addTask, completeTask, deleteTask };

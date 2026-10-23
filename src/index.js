#!/usr/bin/env node
const { loadTasks, saveTasks } = require('./storage');
const { addTask, completeTask, deleteTask } = require('./tasks');

const USAGE = `Usage:
  node src/index.js add "<description>"
  node src/index.js list
  node src/index.js done <id>
  node src/index.js delete <id>`;

function main(argv) {
  const [command, ...args] = argv.slice(2);

  if (!command) {
    console.error(USAGE);
    process.exit(1);
  }

  try {
    const tasks = loadTasks();

    if (command === 'add') {
      const description = args.join(' ');
      if (!description) throw new Error('Please provide a task description.');
      const updated = addTask(tasks, description);
      const newTask = updated[updated.length - 1];
      saveTasks(updated);
      console.log(`Added task #${newTask.id}: ${description}`);

    } else if (command === 'list') {
      if (tasks.length === 0) {
        console.log('No tasks yet.');
        return;
      }
      tasks.forEach(t => {
        const status = t.done ? '[x]' : '[ ]';
        console.log(`[${t.id}] ${status} ${t.description}`);
      });

    } else if (command === 'done') {
      const id = parseInt(args[0], 10);
      if (isNaN(id)) throw new Error('Please provide a valid task ID.');
      const updated = completeTask(tasks, id);
      saveTasks(updated);
      console.log(`Task #${id} marked as done.`);

    } else if (command === 'delete') {
      const id = parseInt(args[0], 10);
      if (isNaN(id)) throw new Error('Please provide a valid task ID.');
      const updated = deleteTask(tasks, id);
      saveTasks(updated);
      console.log(`Task #${id} deleted.`);

    } else {
      console.error(`Unknown command: "${command}"\n\n${USAGE}`);
      process.exit(1);
    }

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main(process.argv);

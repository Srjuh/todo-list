const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ name: task, completed: false });
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const taskIndex = req.body.taskIndex;
  tasks.splice(taskIndex, 1);
  res.redirect('/');
});

app.post('/toggle/:index', (req, res) => {
  const taskIndex = req.params.index;
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

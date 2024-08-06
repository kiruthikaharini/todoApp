const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://userOne:zXnHSFN9TQ9BYTPy@todoapp.pw6ihnv.mongodb.net/?retryWrites=true&w=majority&appName=todoApp');

const taskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model('task', taskSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Home route to list tasks
app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

// Add task route
app.post('/add', async (req, res) => {
    const taskName = req.body.name;
    if (taskName) {
        await Task.create({ name: taskName });
    }
    res.redirect('/');
});

// Delete task route
app.post('/delete', async (req, res) => {
    const taskId = req.body.taskId;
    if (taskId) {
        await Task.findByIdAndDelete(taskId);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

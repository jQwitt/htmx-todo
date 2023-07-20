import express from 'express'
import path from 'path'
import 'dotenv/config'

const todoList = [
    {
        id: '1',
        title: 'Groceries',
        dueDate: 'Today',
        completed: false,
    },
    {
        id: '2',
        title: 'Clean Car',
        dueDate: 'Yesterday',
        completed: false,
    },
    {
        id: '3',
        title: 'Submit Taxes',
        dueDate: '08/27/2001',
        completed: false,
    },
]

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

if (process.env.ENABLE_DEVELOPMENT_LOGGING === 'true') {
    app.use((req, res, next) => {
        req.on('end', () => console.log(todoList))
        next()
    })
}

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Jack',
    })
})

app.get('/todos', function (req, res) {
    res.render('components/_todo-list', {
        list: todoList.filter((todo) => !todo.completed),
    })
})

app.get('/todos/completed', function (req, res) {
    res.render('components/_todo-list', {
        list: todoList.filter((todo) => todo.completed),
    })
})

app.post('/todos/:id/toggle', function ({ params }, res) {
    const { id } = params
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
    }
    res.render('wrappers/_todo-wrapper', { ...todo })
})

app.delete('/todos/:id', function ({ params }, res) {
    const { id } = params
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
        todoList.splice(todoList.indexOf(todo), 1)
    }
    res.render('wrappers/_todo-wrapper', { id: '-1' })
})

app.listen(3000, () => {
    console.log('server is running!')
})

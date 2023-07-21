import express from 'express'

import 'dotenv/config'

import { v4 as uuidv4 } from 'uuid'
import { middleware } from './server/middleware'

// eslint-disable-next-line
const todoList: any[] = [
    {
        id: uuidv4(),
        title: 'Get gas',
        dueDate: 'Today',
        completed: false,
    },
]

const app = express()
middleware(app)

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

app.post('/todos', function (req, res) {
    const { title, dueDate } = req.body
    if (title && dueDate) {
        const newTodo = { id: uuidv4(), title, dueDate, completed: false }
        todoList.push(newTodo)
        res.render('wrappers/_todo-wrapper', newTodo)
    }
    res.send()
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

app.put('/todos/:id', function ({ params, body }, res) {
    const { id } = params
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
        todoList[todoList.indexOf(todo)] = Object.assign(todo, body)
    }
    res.render('wrappers/_todo-wrapper', { ...todo, title: 'server' })
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

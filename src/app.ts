import express from 'express'
import path from 'path'

const todoList = [
    {
        id: '1',
        title: 'Groceries',
        dueDate: 'Today',
    },
    {
        id: '2',
        title: 'Clean Car',
        dueDate: 'Yesterday',
    },
    {
        id: '3',
        title: 'Submit Taxes',
        dueDate: '08/27/2001',
    },
]

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Jack',
    })
})

app.get('/todos', function (req, res) {
    res.render('components/_todo-list', { list: todoList })
})

app.delete('/todos/:id', function ({ params }, res) {
    const { id } = params
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
        todoList.splice(todoList.indexOf(todo), 1)
    }
    res.render('components/_todo-list', { list: todoList })
})

app.listen(3000, () => {
    console.log('server is running!')
})

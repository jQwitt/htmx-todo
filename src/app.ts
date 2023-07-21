import express from 'express'
import 'dotenv/config'

import { PrismaClient } from '@prisma/client'

import { middleware } from './server/middleware'
import log from './utils/logger'

const app = express()
middleware(app)

if (process.env.ENABLE_DEVELOPMENT_LOGGING === 'true') {
    app.use((req, res, next) => {
        log.requestInfo(req.method, req.path)
        next()
    })
}

const prisma = new PrismaClient()

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Jack',
    })
})

app.get('/todos', async function (req, res) {
    const todos = await prisma.todo.findMany({
        where: {
            completed: false,
        },
    })
    res.render('components/_todo-list', {
        list: todos,
    })
})

app.post('/todos', async function (req, res) {
    const { title, dueDate } = req.body
    if (title && dueDate) {
        const todo = await prisma.todo.create({
            data: {
                title,
                dueDate,
                completed: false,
            },
        })
        res.render('wrappers/_todo-wrapper', todo)
    }
    res.send()
})

app.get('/todos/completed', async function (req, res) {
    const todos = await prisma.todo.findMany({
        where: {
            completed: true,
        },
    })
    res.render('components/_todo-list', {
        list: todos,
    })
})

app.post('/todos/:id/complete', async function ({ params }, res) {
    const { id } = params
    const todo = await prisma.todo.update({
        where: {
            id: Number(id),
        },
        data: {
            completed: true,
        },
    })
    if (todo) {
        res.render('wrappers/_todo-wrapper', todo)
    }
    res.send()
})

app.delete('/todos/:id', async function ({ params }, res) {
    const { id } = params
    await prisma.todo.delete({
        where: {
            id: Number(id),
        },
    })
    res.send(null)
})

const run = async () =>
    app.listen(3000, () => {
        console.log('server is running!')
    })

run()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

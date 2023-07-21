import bodyParser from 'body-parser'
import { Express } from 'express-serve-static-core'
import path from 'path'

export const middleware = (app: Express): Express => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, '..', 'views'))

    return app
}

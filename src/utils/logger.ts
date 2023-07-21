import chalk from 'chalk'

const requestInfo = (verb: string, path: string) => {
    const log = console.log
    const color = (verb: unknown) => {
        switch (verb) {
            case 'GET':
                return chalk.green(verb)
            case 'POST':
            case 'PUT':
                return chalk.yellow(verb)
            case 'DELETE':
                return chalk.red(verb)
            default:
                return verb
        }
    }

    const timestamp = new Date().toLocaleTimeString()

    log(`${timestamp}: ${color(verb)} ${path}`)
}

export default { requestInfo }

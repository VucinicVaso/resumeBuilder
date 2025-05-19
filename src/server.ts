import express       from 'express'
import colors        from 'colors'
import morgan        from 'morgan'
import Environment   from './util/enviroment/environment'
import Database      from './util/database/database'
import AppRouter     from './router/router'
import AppMiddleware from './util/middleware/appMiddleware'

class Server {

    private static instance: Server
    public app?: express.Application
    public env?: Environment
    public db?: Database

    constructor() {
        this.env = Environment.getInstance()
        this.db = new Database(this.env.getMongoUri())
    }

    public static getInstance(): Server {
        if(!Server.instance) {
            console.log('-- new Server() instance..')
            Server.instance = new Server()
        }
        return Server.instance
    }

    public async init(): Promise<void> {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(morgan('tiny'))
        this.app.use('/static', express.static('src/assets'))
        new AppRouter(this.app!)
        this.app.use(AppMiddleware.routeNotFound) // middleware for route not found
        this.app.use(AppMiddleware.errorHandler)  // middleware for error handling

        this.app.listen(
            this.env!.getPort(),
            this.env!.getHost(), 
            () => console.log(colors.cyan.bold(`-- Server running in (${this.env!.getEnv()}) mode, port (${this.env?.getPort()}), host (${this.env!.getHost()})`))
        )
    }

}

export default Server

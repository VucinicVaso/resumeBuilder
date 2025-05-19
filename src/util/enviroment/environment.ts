import * as dotenv from 'dotenv'
import colors      from 'colors'

/**
 * util class for reading enviroment variables from local .env file
 */
class Environment {

    private static instance: Environment

    private ENV: string | undefined
    private PORT: number | undefined
    private HOST: string | undefined
    private MONGO_URI: string | undefined
    private JWT_SECRET: string | undefined

    public static getInstance(): Environment {
        if(!Environment.instance) {
            console.log('-- new Environment() instance') //delete this line
            Environment.instance = new Environment()
            Environment.instance.init()
        }

        return Environment.instance
    }

    public init(): void {
        let dot: any = dotenv.config()

        if(dot.error) {
            console.error(colors.red.underline.bold(`-- (Environment) error: ${dot.error}`))
            process.exit(1)
        }

        this.setEnv(process.env.NODE_ENV!)
        this.setHost(process.env.HOST!)
        this.setPort(Number(process.env.PORT) ?? 3000)
        this.setMongoUri(process.env.MONGO_URI!)
        this.setJwtSecret(process.env.JWT_SECRET!)
    }

    private setEnv(env: string) : void { this.ENV = env }
    public getEnv() : string { return this.ENV! }

    private setHost(host: string) : void { this.HOST = host }
    public getHost() : string { return this.HOST! }

    private setPort(port: number) : void { this.PORT = port }
    public getPort() : number { return this.PORT! }

    private setMongoUri(mongoUri: string) : void { this.MONGO_URI = mongoUri }
    public getMongoUri() : string { return this.MONGO_URI! }

    private setJwtSecret(jwt: string) : void { this.JWT_SECRET = jwt }
    public getJwtSecret() : string { return this.JWT_SECRET! }

}

export default Environment
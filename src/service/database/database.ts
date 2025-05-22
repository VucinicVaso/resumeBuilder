import colors   from 'colors'
import mongoose from 'mongoose'

/**
 * util class for MongoDB
 */
class Database {

    private mongoUri: string
    private conn: any

    constructor(mongoUri: string) {
        this.mongoUri = mongoUri
        this.init()
    }

    private async init() : Promise<void> {
        try {
            this.conn = await mongoose.connect(this.mongoUri, {})
            console.log(colors.cyan.bold(`-- Database connected: ${this.conn.connection.host}`))
        } catch(e: any) {
            console.error(colors.red.underline.bold(`-- Database error: ${e.message}`))
            process.exit(1)
        }
    }

}

export default Database
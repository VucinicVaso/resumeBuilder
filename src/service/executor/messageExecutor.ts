import { Request, Response, NextFunction } from 'express'

/**
 * message executor
 */
interface MessageExecutor {

    execute(request: Request, response: Response, next: NextFunction) : Promise<any>

}

export default MessageExecutor
import { Request, Response, NextFunction } from 'express'

/**
 * 
 */
interface MessageExecutor {

    execute(request: Request, response: Response, next: NextFunction) : Promise<any>

}

export default MessageExecutor
import { Request, Response, NextFunction } from 'express'
import AppMiddleware                       from './appMiddleware'
import MessageExecutor                     from '../../service/executor/messageExecutor'

/**
 * Middleware for admin validator for received HTTP request
 */
class AdminAuthorizationMiddleware implements MessageExecutor {

    executor?: MessageExecutor

    constructor(executor: MessageExecutor) {
        this.executor = executor
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        console.log('-- AdminAuthorizationMiddleware execute') //delete this line
        
        if(request.user!.isAdmin == true) {
            this.executor!.execute(request, response, next)
        }else {
            AppMiddleware.errorHandler(new Error(`${'[CODE-auth] You are not authorized.'}`), request, response, next)
        }
    }

}

export default AdminAuthorizationMiddleware
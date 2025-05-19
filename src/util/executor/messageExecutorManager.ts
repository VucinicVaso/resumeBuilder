import { NextFunction, Request, Response } from 'express'
import AppMiddleware                       from '../middleware/appMiddleware'
import MessageExecutor                     from './messageExecutor'

/**
 * 
 */
abstract class MessageExecutorManager {

    private map: Map<string, MessageExecutor> = new Map<string, MessageExecutor>()
   
    public register(name: string, executor: MessageExecutor) : void { 
        this.map.set(name, executor) 
    }

    public call(name: string, request: Request, response: Response, next: NextFunction) {
        try {
            const executor: MessageExecutor | undefined = this.map.get(name)
            if(executor == null || executor == undefined) throw `Route not found - ${request.body.destination}`
            executor.execute(request, response, next)
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default MessageExecutorManager
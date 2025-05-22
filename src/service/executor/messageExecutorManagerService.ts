import { NextFunction, Request, Response } from 'express'
import AppMiddleware                       from '../../util/middleware/appMiddleware'
import MessageExecutorManager              from './messageExecutorManager'

/**
 * servis koji sadrzi listu messageExecutorManager-a
 * pozivom 
 */
abstract class MessageExecutorManagerService {

    private managers: Map<string, MessageExecutorManager> = new Map<string, MessageExecutorManager>()
   
    public register(name: string, executor: MessageExecutorManager) : void { 
        this.managers.set(name, executor) 
    }

    public call(name: string, request: Request, response: Response, next: NextFunction) {
        try {
            const manager: MessageExecutorManager | undefined = this.managers.get(name)
            if(manager == null || manager == undefined) throw `Route not found - ${request.body.destination}`

            let destination: string | undefined = request.body.destination.split('/')[1]
            manager.call(destination!, request, response, next)
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default MessageExecutorManagerService
import { Router, NextFunction, Request, Response } from 'express'
import MessageExecutorManager                      from '../service/executor/messageExecutorManager';
import AppMiddleware                               from '../util/middleware/appMiddleware';

abstract class AppRouter {

    private router?: Router
    setRouter() : void { this.router =  Router(); }
    getRouter() : Router { return this.router!; }

    private routeManagers: Map<string, MessageExecutorManager> = new Map<string, MessageExecutorManager>()
    public registerRouteManager(name: string, executor: MessageExecutorManager) : void { 
        this.routeManagers.set(name, executor) 
    }
    public callRouteManager(name: string, request: Request, response: Response, next: NextFunction) {
        try {
            const manager: MessageExecutorManager | undefined = this.routeManagers.get(name)
            if(manager == null || manager == undefined) throw `Route not found - ${request.body.destination}`

            let destination: string | undefined = request.body.destination.split('/')[1]
            manager.call(destination!, request, response, next)
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default AppRouter
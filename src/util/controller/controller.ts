import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../executor/messageExecutor'
import MessageExecutorManager              from '../executor/messageExecutorManager'

abstract class Controller implements MessageExecutor {

    public messageExecutorManager : MessageExecutorManager | undefined

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        let destination: string | undefined = request.body.destination.split('/')[1]
        this.messageExecutorManager!.call(destination!, request, response, next)
    }

}

export default Controller
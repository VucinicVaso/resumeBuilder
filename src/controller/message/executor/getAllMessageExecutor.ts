import { Request, Response, NextFunction } from 'express'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import { IMessage }                        from '../../../model/message'
import MessageRepository                   from '../../../repository/messageRepository'

class GetAllMessageExecutor implements MessageExecutor {

    private messageRepository?: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: IMessage[] = await this.messageRepository!.getAll()
            response.json({ success: true, messages: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor
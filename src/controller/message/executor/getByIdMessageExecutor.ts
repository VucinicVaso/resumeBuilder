import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetMessageById }                 from '../interface/iGetMessageById'
import { IMessage }                        from '../../../model/message'
import MessageRepository                   from '../../../repository/message/messageRepository'
class GetByIdMessageExecutor implements MessageExecutor {

    private messageRepository?: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGmBi: IGetMessageById = request.body
            let result : IMessage | null = await this.messageRepository!.getById(iGmBi._id!)
            if(!result) throw `Message ${iGmBi._id} not found.`
            
            response.json({ success: true, message: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor
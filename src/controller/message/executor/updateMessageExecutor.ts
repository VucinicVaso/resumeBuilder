import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateMessage }                  from '../interface/iUpdateMessage'
import { IMessage }                        from '../../../model/message'
import MessageRepository                   from '../../../repository/message/messageRepository'

class UpdateMessageExecutor implements MessageExecutor {

    private messageRepository?: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUm: IUpdateMessage = request.body
            const iM: IMessage = iUm
            iM.isRead = true

            let result: boolean = await this.messageRepository!.update(iM)
            if(!result) throw `Something went wrong with updating message ${iM._id}.`
           
            response.json({ success: true, message: `Message ${iM._id} updated successfully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default UpdateMessageExecutor
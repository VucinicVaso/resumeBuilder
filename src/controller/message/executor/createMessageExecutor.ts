import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICreateMessage }                  from '../interface/iCreateMessage'
import { IMessage }                        from '../../../model/message'
import MessageRepository                   from '../../../repository/messageRepository'

class CreateMessageExecutor implements MessageExecutor {

    private messageRepository?: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iCm: ICreateMessage = request.body
            const iM: IMessage = iCm
            iM.user = request.user!._id
            iM.isRead = false

            const result: boolean = await this.messageRepository!.save(iM)
            if(!result) throw 'Message was not saved. Please try again.'

            response.status(201).json({ success: true, message: 'Message created successfully.' })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default CreateMessageExecutor
import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroyMessage }                 from '../interface/iDestroyMessage'
import MessageRepository                   from '../../../repository/messageRepository'

class DestroyMessageExecutor implements MessageExecutor {

    private messageRepository?: MessageRepository

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDm: IDestroyMessage = request.body

            const result: boolean = await this.messageRepository!.delete(iDm._id!)
            if(!result) throw `Something went wrong with deleting message ${iDm._id}.`
            
            response.json({ success: true, message: `Message ${iDm._id} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor
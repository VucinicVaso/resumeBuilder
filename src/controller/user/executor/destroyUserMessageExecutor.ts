import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import UserRepository                      from '../../../repository/userRepository'
import { IDestroyUserById }                from '../interface/iDestroyUserById'

class DestroyUserMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDuBi : IDestroyUserById = request.body
            const result: boolean = await this.userRepository!.delete(iDuBi._id!)
            if(!result) throw `Something went wrong with deleting user with _id ${iDuBi._id!}.`

            response.json({ success: true, message: `User with _id ${iDuBi._id!} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default DestroyUserMessageExecutor
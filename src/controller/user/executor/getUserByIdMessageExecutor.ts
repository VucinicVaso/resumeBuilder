import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import { IUser }                           from '../../../model/user'
import { IGetUserById }                    from '../interface/iGetUserById'
import UserRepository                      from '../../../repository/userRepository'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'

class GetUserByIdMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGuBi: IGetUserById = request.body
            let result : IUser | null = await this.userRepository!.getById(iGuBi._id!)
            if(result == null) throw `User with _id ${iGuBi._id} not found.`
            
            response.json({ success: true, user: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default GetUserByIdMessageExecutor
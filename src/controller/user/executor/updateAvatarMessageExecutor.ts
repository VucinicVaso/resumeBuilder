import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateUsersAvatar }              from '../interface/iUpdateUsersAvatar'
import { IUser }                           from '../../../model/user'
import UserRepository                      from '../../../repository/user/userRepository'

class UpdateAvatarMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUuA: IUpdateUsersAvatar = request.body
            const iU: IUser = { 'avatar': `images/${iUuA.file}` }
            iU._id = request.user!._id!
            
            let result : boolean = await this.userRepository!.update(iU)
            if(!result) throw 'Something went wrong with updating avatar.'
            
            response.json({ success: true, message: 'Avatar updated successfully.' })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default UpdateAvatarMessageExecutor
import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateUsersProfile }             from '../interface/iUpdateUsersProfile'
import { IUser }                           from '../../../model/user/user'
import UserRepository                      from '../../../repository/user/userRepository'

class UpdateProfileMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let iUuP: IUpdateUsersProfile = request.body
            iUuP._id = request.user!._id!
            const iU: IUser = iUuP

            let result : boolean = await this.userRepository!.update(iU)
            if(!result) throw 'Something went wrong with updating profile.'
            
            response.json({ success: true, message: 'Profile updated successfully.' })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default UpdateProfileMessageExecutor
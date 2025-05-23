import { NextFunction, Request, Response } from 'express'
import MethodExecutor                      from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUpdateUsersProfile }             from '../interface/iUpdateUsersProfile'
import { IUser }                           from '../../../model/user'
import UserRepository                      from '../../../repository/userRepository'

class UpdateProfileMessageExecutor implements MethodExecutor {

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
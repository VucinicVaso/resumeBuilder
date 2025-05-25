import { NextFunction, Request, Response } from 'express'
import bcrypt                              from 'bcryptjs'
import { IUpdateUsersPassword }            from '../interface/iUpdateUsersPassword'
import { IUser }                           from '../../../model/user'
import UserRepository                      from '../../../repository/user/userRepository'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'

class UpdatePasswordMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(reguest: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iUuP: IUpdateUsersPassword = reguest.body
            const salt = await bcrypt.genSalt(10)
            iUuP.password = await bcrypt.hash(iUuP.password!, salt)
            const iU: IUser = iUuP

            let result : boolean = await this.userRepository!.update(iU)
            if(!result) throw 'Something went wrong with updating password.'
            
            response.json({ success: true, message: 'Password updated successfully.' })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), reguest, response, next)
        }
    }

}

export default UpdatePasswordMessageExecutor
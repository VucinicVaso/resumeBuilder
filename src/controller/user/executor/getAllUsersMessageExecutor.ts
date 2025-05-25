import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IUser }                           from '../../../model/user'
import UserRepository                      from '../../../repository/user/userRepository'

class GetAllUsersMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: IUser[] = await this.userRepository!.getAll()
            
            response.json({ success: true, users: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default GetAllUsersMessageExecutor
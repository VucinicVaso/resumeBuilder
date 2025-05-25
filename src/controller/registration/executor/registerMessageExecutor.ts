import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IRegisterUser }                   from '../interface/iRegisterUser'
import { IUser }                           from '../../../model/user/user'
import UserRepository                      from '../../../repository/user/userRepository'

class RegisterMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }
    
    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iRu: IRegisterUser = request.body
            const iU: IUser = iRu
        
            const adminExists: IUser | null = await this.userRepository!.getAdmin()
            if(adminExists) throw 'Admin already exists.'

            const iUserFound: IUser | null = await this.userRepository!.getByEmail(iRu.email!)
            if(iUserFound != null) throw 'Email already exists.'

            const result: boolean = await this.userRepository!.save(iU)
            if(!result) throw 'User was not saved. Please try again.'

            response.status(201).json({ success: true, message: 'Profile created successfully.' })
        }catch(e : any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }
    
}

export default RegisterMessageExecutor
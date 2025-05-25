import { NextFunction, Request, Response } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ILoginUser }                      from '../interface/iLoginUser'
import { IUser }                           from '../../../model/user/user'
import UserRepository                      from '../../../repository/user/userRepository'

class LoginMessageExecutor implements MessageExecutor {

    private userRepository?: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iLu: ILoginUser = request.body

            const iU: IUser | null = await this.userRepository!.getByEmail(iLu.email!)
            if(iU == null) throw 'Email does not exist.'

            let passwordExists = await this.userRepository!.validatePassword(iLu.password!, iU!.password!)
            if(!passwordExists) throw 'Your password is incorrect.'

            if(!iU.isAdmin) throw 'You are not authorized. Only admins are.'

            response.json({
                success: true,
                token: await this.userRepository?.generateJwtToken(iU!._id!),
                user: {
                    id:        iU!._id,
                    firstname: iU!.firstname,
                    lastname:  iU!.lastname,
                    username:  iU!.username,
                    email:     iU!.email,
                    avatar:    iU!.avatar,
                    birthdate: iU!.dateOfBirth,
                    city:      iU!.city,
                    country:   iU!.country,
                    gender:    iU!.gender
                }
            })
        }catch(e : any) {
           AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default LoginMessageExecutor
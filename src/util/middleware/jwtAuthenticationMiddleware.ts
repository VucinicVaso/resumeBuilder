import { Request, Response, NextFunction } from 'express'
import jwt                                 from 'jsonwebtoken'
import AppMiddleware                       from './appMiddleware'
import MessageExecutor                     from '../../service/executor/messageExecutor'
import Environment                         from '../enviroment/environment'
import { IUser }                           from '../../model/user/user'
import UserRepository                      from '../../repository/user/userRepository'

/**
 * Middleware for validating json web token from received HTTP request 
 */
class JWTAuthenticationMiddleware implements MessageExecutor {

    private userRepository?: UserRepository
    private executor?: MessageExecutor

    constructor(userRepository: UserRepository, executor: MessageExecutor) {
        this.userRepository = userRepository
        this.executor = executor
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        console.log('-- JWTAuthenticationMiddleware execute') //delete this line
        const env: Environment = Environment.getInstance()
        let token: string = ""

        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
            try{
                token = request.headers.authorization.split(' ')[1]
                const decoded: any = jwt.verify(token, env!.getJwtSecret())
                const user: IUser | null = await this.userRepository!.getById(decoded.id)

                if(user != null && user != undefined) {
                    request.user = user
                    this.executor!.execute(request, response, next)
                }else {
                    AppMiddleware.errorHandler(new Error('[CODE-auth] Authentication failed. Token is invalid.'), request, response, next)
                }
            }catch(err) {
                AppMiddleware.errorHandler(new Error('[CODE-auth] Authentication failed. Token is missing.'), request, response, next)
            }
        }
        if(!token) {
            AppMiddleware.errorHandler(new Error('[CODE-auth] Authentication failed.'), request, response, next)
        }
    }

}

export default JWTAuthenticationMiddleware
import { Request, Response, NextFunction } from 'express'
import Joi                                 from 'joi'
import AppMiddleware                       from './appMiddleware'
import MessageExecutor                     from '../../service/executor/messageExecutor'

/**
 * Middleware for validating body from received HTTP request
 */
class JoiValidationMiddleware implements MessageExecutor {
    
    executor?: MessageExecutor
    schema: Joi.ObjectSchema<any> | undefined

    constructor(schema: Joi.ObjectSchema<any>, executor: MessageExecutor) {
        this.schema = schema
        this.executor = executor
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        console.log('-- JoiValidationMiddleware execute') //delete this line
        const result = this.schema!.validate(request.body)
        const { value, error } = result

        if(error == null) {
            this.executor!.execute(request, response, next)
        }else {
            const { details } = error
            const message = details.map((i: { message: any }) => i.message).join(',')
            AppMiddleware.errorHandler(new Error(`${message}`), request, response, next)
        }
    }

}

export default JoiValidationMiddleware
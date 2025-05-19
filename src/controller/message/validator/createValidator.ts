import Joi from 'joi'

class CreateMessageValidation {

    name?: string
    email?: string
    subject?: string
    message?: string
    
    static validationSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .allow("")
            .messages({
                'string.base':  'name must be a string',
                'string.empty': 'name is a required field'
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'email is empty',
                'string.base':  'email must be a string',
                'string.email': 'email is invalid',
                'any.required': 'email is a required field'
            }),

        subject: Joi.string()
            .allow("")
            .messages({
                'string.base':  'subject must be a string',
                'string.empty': 'subject is a required field'
            }),

        message: Joi.string()
            .required()
            .messages({
                'string.base':  'message must be a string',
                'string.empty': 'message is a required field',
                'any.required': 'message is a required field'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { CreateMessageValidation }

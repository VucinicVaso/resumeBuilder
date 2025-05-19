import Joi from 'joi'

class LoginValidation {

    username?: string
    password?:  string
    
    static validationSchema: Joi.ObjectSchema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'email is empty',
                'string.base':  'email must be a string',
                'string.email': 'email is invalid',
                'any.required': 'email is a required field'
            }),

        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,30})'))
            .required()
            .messages({
                'string.empty':        'password is empty',
                'string.base':         'password must be a string',
                'string.pattern.base': 'password mast be between 6 and 30 characters, and contain at least one number, sign and capital letter',
                'any.required':        'password is a required field'
            }),
        })
        .options({ 
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { LoginValidation }
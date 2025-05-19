import Joi from 'joi'

class UpdateUsersPasswordValidation {

    password?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,30})'))
            .required()
            .messages({
                'string.empty':        'password is empty',
                'string.base':         'password must be a string',
                'string.pattern.base': 'password must contain at least one number, one sign and one capital letter and it must be betweeen 6 and 30 characters long',
                'any.required':        'password is a required field'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { UpdateUsersPasswordValidation }

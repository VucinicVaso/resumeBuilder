import Joi from 'joi'

class DestroyUserValidation {

    _id?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'User _id is empty.',
                'string.base':  'User _id must be a string.',
                'any.required': 'User _id is a required field.'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })
}

export { DestroyUserValidation }

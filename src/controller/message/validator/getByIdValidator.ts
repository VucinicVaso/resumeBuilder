import Joi from 'joi'

class GetMessageByIdValidation {

    _id?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Message _id is empty.',
                'string.base':  'Message _id must be a string.',
                'any.required': 'Message _id is a required field.'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { GetMessageByIdValidation }

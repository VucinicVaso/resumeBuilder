import Joi from 'joi'

class GetEducationByIdValidation {

    _id?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Education _id is empty.',
                'string.base':  'Education _id must be a string.',
                'any.required': 'Education _id is a required field.'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { GetEducationByIdValidation }

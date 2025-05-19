import Joi from 'joi'

class UpdateCvValidation {

    _id?: string
    isActive?: boolean

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': '_id is empty.',
                'string.base':  '_id must be a string.',
                'any.required': '_id is a required field.'
            }),

        isActive: Joi.boolean()
            .messages({
                'boolean.base': 'isActive must be a boolean'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })
        .or( '_id', 'isActive' )

}

export { UpdateCvValidation }

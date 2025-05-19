import Joi from 'joi'

class DestroyCvValidation {

    _id?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Cv _id is empty.',
                'string.base':  'Cv _id must be a string.',
                'any.required': 'Cv _id is a required field.'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { DestroyCvValidation }

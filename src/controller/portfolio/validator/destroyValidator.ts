import Joi from 'joi'

class DestroyPortfolioValidation {

    _id?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Portfolio _id is empty.',
                'string.base':  'Portfolio _id must be a string.',
                'any.required': 'Portfolio _id is a required field.'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { DestroyPortfolioValidation }

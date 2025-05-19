import Joi from 'joi'

class DestroyExperienceValidation {

    _id?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Experience _id is empty.',
                'string.base':  'Experience _id must be a string.',
                'any.required': 'Experience _id is a required field.'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { DestroyExperienceValidation }
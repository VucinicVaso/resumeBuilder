import Joi from 'joi'

class UploadCvValidation {

    file?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        file: Joi.string()
            .messages({
                'string.base':  'file must be a string',
                'string.empty': 'file is a required field'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { UploadCvValidation }
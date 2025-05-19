import Joi from 'joi'

class CreatePortfolioValidation {

    title?: string
    description?: string
    type?: string
    iosLink?: string
    androidLink?: string
    websiteLink?: string
    gitLink?: string
    files?: Array<String>

    static validationSchema: Joi.ObjectSchema = Joi.object({
        title: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.base':  'title must be a string',
                'string.empty': 'title is a required field',
                'string.min':   'title should have a minimum length of 3 characters.',
                'any.required': 'title is a required field'
            }),

        description: Joi.string()
            .allow("")
            .messages({
                'string.base':  'description must be a string',
                'string.empty': 'description is a required field'
            }),

        type: Joi.string()
            .required()
            .messages({
                'string.base':  'type must be a string',
                'string.empty': 'type is a required field',
                'any.required': 'type is a required field'
            }),

        iosLink: Joi.string()
            .allow("")
            .messages({
                'string.base':  'iosLink must be a string',
                'string.empty': 'iosLink is a required field'
            }),

        androidLink: Joi.string()
            .allow("")
            .messages({
                'string.base':  'androidLink must be a string',
                'string.empty': 'androidLink is a required field'
            }),

        websiteLink: Joi.string()
            .allow("")
            .messages({
                'string.base':  'websiteLink must be a string',
                'string.empty': 'websiteLink is a required field'
            }),

        gitLink: Joi.string()
            .allow("")
            .messages({
                'string.base':  'gitLink must be a string',
                'string.empty': 'gitLink is a required field'
            }),

        files: Joi.array()
            .items(Joi.string())
            .messages({
                'array.base':     'files must be an array of string',
                'array.includes': 'files array may only contain strings'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { CreatePortfolioValidation }

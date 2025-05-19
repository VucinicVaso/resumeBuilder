import Joi from 'joi'

class UpdatePortfolioValidation {

    _id?: string
    title?: string
    description?: string
    type?: string
    iosLink?: string
    androidLink?: string
    websiteLink?: string
    gitLink?: string
    files?: Array<String>

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': '_id is empty.',
                'string.base':  '_id must be a string.',
                'any.required': '_id is a required field.'
            }),

        title: Joi.string()
            .messages({
                'string.base':  'title must be a string',
                'string.empty': 'title is a required field'
            }),

        description: Joi.string()
            .messages({
                'string.base':  'description must be a string',
                'string.empty': 'description is a required field'
            }),

        type: Joi.string()
            .messages({
                'string.base':  'type must be a string',
                'string.empty': 'type is a required field'
            }),

        iosLink: Joi.string()
            .messages({
                'string.base':  'iosLink must be a string',
                'string.empty': 'iosLink is a required field'
            }),

        androidLink: Joi.string()
            .messages({
                'string.base':  'androidLink must be a string',
                'string.empty': 'androidLink is a required field'
            }),

        websiteLink: Joi.string()
            .messages({
                'string.base':  'websiteLink must be a string',
                'string.empty': 'websiteLink is a required field'
            }),
    
        gitLink: Joi.string()
            .messages({
                'string.base':  'gitLink must be a string',
                'string.empty': 'gitLinkk is a required field'
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
        .or( 'id', 'title', 'icon', 'subskills' )

}

export { UpdatePortfolioValidation }

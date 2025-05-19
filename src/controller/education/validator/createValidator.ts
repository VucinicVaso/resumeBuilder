import Joi from 'joi'

class CreateEducationValidation {

    title?: string
    link?: string
    description?: string
    date?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        title: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.empty': 'title is a required field',
                'string.base':  'title must be a string',
                'string.min':   'title should have a minimum length of 3.',
                'any.required': 'title is a required field'
            }),

        link: Joi.string()
            .allow("")
            .pattern(new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"))
            .messages({
                'string.empty':        'link is a required field',
                'string.base':         'link must be a string',
                'string.pattern.base': 'link is not valid.'
            }),

        description: Joi.string()
            .allow("")
            .messages({
                'string.empty': 'description is a required field',
                'string.base':  'description must be a string'
            }),

        date: Joi.string()
            .required()
            .messages({
                'string.empty': 'date is a required field',
                'string.base':  'date must be a string',
                'any.required': 'date is a required field'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { CreateEducationValidation }

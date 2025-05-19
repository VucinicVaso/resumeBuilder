import Joi from 'joi'

class CreateExperienceValidation {

    title?: string
    link?: string
    position?: string
    description?: string
    dateFrom?: string
    dateTo?: string
    totalTime?: string
        
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

        link: Joi.string()
            .allow("")
            .pattern(new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"))
            .required()
            .messages({
                'string.base':         'link must be a string',
                'string.empty':        'link is a required field',
                'string.pattern.base': 'link is not valid.',
                'any.required':        'link is a required field'
            }),

        position: Joi.string()
            .allow("")
            .required()
            .messages({
                'string.base':  'position must be a string',
                'string.empty': 'position is a required field',
                'any.required': 'position is a required field'
            }),

        description: Joi.string()
            .allow("")
            .required()
            .messages({
                'string.base':  'description must be a string',
                'string.empty': 'descriptionis a required field',
                'any.required': 'description is a required field'
            }),

        dateFrom: Joi.string()
            .required()
            .messages({
                'string.base':  'dateFrom must be a string',
                'string.empty': 'dateFrom is a required field',
                'any.required': 'dateFrom is a required field'
            }),

        dateTo: Joi.string()
            .allow("")
            .required()
            .messages({
                'string.base':  'dateTo must be a string',
                'string.empty': 'dateTo is a required field',
                'any.required': 'dateTo is a required field'
            }),

        totalTime: Joi.string()
            .allow("")
            .required()
            .messages({
                'string.base':  'totalTime must be a string',
                'string.empty': 'totalTime is a required field',
                'any.required': 'totalTime is a required field'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { CreateExperienceValidation }

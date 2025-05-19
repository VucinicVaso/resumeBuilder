import Joi from 'joi'

class UpdateEducationValidation {

    _id?: string
    title?: string
    link?: string
    description?: string
    date?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Education _id is empty.',
                'string.base':  'Education _id must be a string.',
                'any.required': 'Education _id is a required field.'
            }),

        title: Joi.string()
            .min(3)
            .messages({
                'string.empty': 'title is a required field',
                'string.base':  'title must be a string',
                'string.min':   'title  should have a minimum length of 3.'
            }),

        link: Joi.string()
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
                'string.base':  'description  must be a string'
            }),

        date: Joi.string()
            .messages({
                'string.empty': 'date is a required field',
                'string.base':  'date must be a string'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })
        .or( 'id', 'title', 'link', 'description', 'date' )

}

export { UpdateEducationValidation }
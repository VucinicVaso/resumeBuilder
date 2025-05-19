import Joi from 'joi'

class UpdateExperienceValidation {

    _id?: string
    title?: string
    link?: string
    position?: string
    description?: string
    dateFrom?: string
    dateTo?: string
    totalTime?: string
        
    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': '_id is empty.',
                'string.base':  '_id must be a string.',
                'any.required': '_id is a required field.'
            }),

        title: Joi.string()
            .min(3)
            .messages({
                'string.base':  'title must be a string',
                'string.empty': 'title is a required field',
                'string.min':   'title should have a minimum length of 3 characters.',
            }),
    
        link: Joi.string()
            .allow("")
            .pattern(new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"))
            .messages({
                'string.base':         'link must be a string',
                'string.empty':        'link is a required field',
                'string.pattern.base': 'link is not valid.'
            }),
    
        position: Joi.string()
            .allow("")
            .messages({
                'string.base':  'position must be a string',
                'string.empty': 'position is a required field'
            }),
    
        description: Joi.string()
            .allow("")
            .messages({
                'string.base':  'description must be a string',
                'string.empty': 'description is a required field'
            }),
    
        dateFrom: Joi.string()
            .messages({
                'string.base':  'dateFrom must be a string',
                'string.empty': 'dateFrom is a required field'
            }),
    
        dateTo: Joi.string()
            .messages({
                'string.base':  'dateTo must be a string',
                'string.empty': 'dateTo is a required field'
            }),
    
        totalTime: Joi.string()
            .messages({
                'string.base':  'totalTime must be a string',
                'string.empty': 'totalTime is a required field'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })
        .or( 'id', 'title', 'link', 'position', 'description', 'dateFrom', 'dateTo', 'totalTime' )
}

export { UpdateExperienceValidation }
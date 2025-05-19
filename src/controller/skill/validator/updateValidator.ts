import Joi from 'joi'

class UpdateSkillValidation {

    _id?: string
    title?: string
    icon?: string
    subskills?: Array<String>

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
    
        icon: Joi.string()
            .messages({
                'string.base':  'icon must be a string',
                'string.empty': 'icon is a required field'
            }),
    
        subskills: Joi.array()
            .items(Joi.string())
            .messages({
                'array.base':     'subskills must be an array of string',
                'array.includes': 'subskills array may only contain strings'
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false
        })
        .or( 'id', 'title', 'icon', 'subskills' )
}

export { UpdateSkillValidation }

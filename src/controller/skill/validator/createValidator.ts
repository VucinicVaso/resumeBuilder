import Joi from 'joi'

class CreateSkillValidation {

    title?: string
    icon?: string
    subskills?: Array<String>

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

        icon: Joi.string()
            .allow("")
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

}

export { CreateSkillValidation }

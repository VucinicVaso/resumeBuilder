import Joi from 'joi'

class GetSkillByIdValidation {

    _id?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Skill _id is empty.',
                'string.base':  'Skill _id must be a string.',
                'any.required': 'Skill _id is a required field.'
            })
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { GetSkillByIdValidation }

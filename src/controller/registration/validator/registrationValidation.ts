import Joi from 'joi'

class RegisterValidation {

    firstname?: string
    lastname?: string
    email?: string
    password?: string
    confirmPassword?: string
    dateOfBirth?: string
    city?: string
    country?: string
    gender?: string

    static validationSchema: Joi.ObjectSchema = Joi.object({
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z]+$'))
            .messages({
                'string.empty':        'firstname is empty',
                'string.base':         'firstname must be a string',
                'any.required':        'firstname is a required field',
                'string.min':          'firstname should have a minimum length of 3',
                'string.max':          'firstname should have a maximum length of 30',
                'string.pattern.base': 'firstname can only contain letters, without spaces, numbers or characters'
            }),

        lastname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[A-Za-z]+$'))
            .messages({
                'string.empty':        'lastname is empty',
                'string.base':         'lastname must be a string',
                'any.required':        'lastname is a required field',
                'string.min':          'lastname should have a minimum length of 3',
                'string.max':          'lastname should have a maximum length of 30',
                'string.pattern.base': 'lastname can only contain letters, without spaces, numbers or characters'
            }),

        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.empty': 'email is empty',
                'string.base':  'email must be a string',
                'string.email': 'email is invalid',
                'any.required': 'email is a required field'
            }),

        password: Joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,30})'))
            .required()
            .messages({
                'string.empty':        'password is empty',
                'string.base':         'password must be a string',
                'string.pattern.base': 'password must contain at least one number, one sign and one capital letter and it must be betweeen 6 and 30 characters long',
                'any.required':        'password is a required field'
            }),
            
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .strict()
            .messages({
                'string.empty': 'confirmPassword is empty',
                'string.base':  'confirmPasswordd must be a string',
                'any.only' :    'confirmPassword and password password dont match',
                'any.required': 'confirmPassword is a required field'
            }),
            
            dateOfBirth: Joi.string()
            .pattern(new RegExp('^[0-9]{4,4}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{2,2}$'))
            .required()
            .messages({
                'string.empty':        'dateOfBirth of birth is empty',
                'string.base':         'dateOfBirth of birth must be a string',
                'string.pattern.base': 'dateOfBirth of birth must be of a format year-month-day (1999-01-15)',
                'any.required':        'dateOfBirth of birth is a required field'
            }),

        city: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[A-Za-z]+$'))
            .required()
            .messages({
                'string.empty':        'city is empty',
                'string.base':         'city must be a string',
                'string.min':          'city should have a minimum length of 3',
                'string.max':          'city should have a minimum length of 30',
                'string.pattern.base': 'city can only contain letters, without spaces, numbers or characters',
                'any.required':        'city is a required field'
            }),

        country: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[A-Za-z]+$'))
            .required()
            .messages({
                'string.empty':        'country is empty',
                'string.base':         'country must be a string',
                'string.min':          'country should have a minimum length of 3 characters',
                'string.max':          'country should have a minimum length of 30 characters',
                'string.pattern.base': 'country can only contain letters, without spaces, numbers or characters',
                'any.required':        'country is a required field'
            }),
            
        gender: Joi.string()
            .min(4)
            .max(6)
            .pattern(new RegExp('^[A-Za-z]+$'))
            .required()
            .valid('male', 'female')
            .messages({
                'string.empty':        'gender is empty',
                'string.base':         'gender must be a string',
                'string.min':          'gender hould have a minimum length of 4 characters',
                'string.max':          'gender should have a minimum length of 6 characters',
                'string.pattern.base': 'gender can only contain letters, without spaces, numbers or characters',
                'any.required':        'gender is a required field'
            }),
        })
        .options({ 
            allowUnknown: true, 
            abortEarly: false 
        })

}

export { RegisterValidation }
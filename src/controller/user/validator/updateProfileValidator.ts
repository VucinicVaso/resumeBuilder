import Joi from 'joi'

class UpdateUsersProfileValidation {

    firstname?: string
    lastname?: string
    username?: string
    email?: string
    dateOfBirth?: string
    city?: string
    country?: string
    gender?: string
    isAdmin?: boolean
    personalWebsite?: Map<string, string>
    linkedInWebsite?: Map<string, string>
    githubWebsite?: Map<string, string>

    static validationSchema: Joi.ObjectSchema = Joi.object({
        firstname: Joi.string()
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

        username: Joi.string()
            .min(3)
            .max(30)
            .messages({
                'string.empty': 'username is empty',
                'string.base':  'username must be a string',
                'any.required': 'username is a required field',
                'string.min':   'username should have a minimum length of 3',
                'string.max':   'username should have a maximum length of 30'
            }),

        email: Joi.string()
            .email()
            .messages({
                'string.empty': 'email is empty',
                'string.base':  'email must be a string',
                'string.email': 'email is invalid',
                'any.required': 'email is a required field'
            }),

        dateOfBirth: Joi.string()
            .pattern(new RegExp('^[0-9]{4,4}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{2,2}$'))
            .messages({
                'string.empty':        'dateofbirth is empty',
                'string.base':         'dateofbirth must be a string',
                'string.pattern.base': 'dateofbirth must be of a format year-month-day (1999-01-15)',
                'any.required':        'dateofbirth is a required field'
            }),

        city: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[A-Za-z]+$'))
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
            .valid('male', 'female')
            .pattern(new RegExp('^[A-Za-z]+$'))
            .messages({
                'string.empty':        'gender is empty',
                'string.base':         'gender must be a string',
                'string.min':          'gender should have a minimum length of 4 characters',
                'string.max':          'gender should have a minimum length of 6 characters',
                'string.pattern.base': 'gender can only contain letters, without spaces, numbers or characters',
                'any.required':        'gender is a required field'
            }),

        isAdmin: Joi.boolean()
            .messages({
                'boolean.base': 'isAdmin must be boolean.'
            }),

        personalWebsite: Joi.object({
            link: Joi.string()
                .messages({
                    'string.empty': 'personalWebsite.link is empty',
                    'string.base':  'personalWebiste.link must be a string',        
                }),
            name: Joi.string()
                .messages({
                    'string.empty': 'personalWebsite.name is empty',
                    'string.base':  'personalWebiste.name must be a string',        
                }),
            }),
        
        linkedInWebsite: Joi.object({
            link: Joi.string()
                .messages({
                    'string.empty': 'linkedInWebsite.link is empty',
                    'string.base':  'linkedInWebsite.link must be a string',        
                }),
            name: Joi.string()
                .messages({
                    'string.empty': 'linkedInWebsite.name is empty',
                    'string.base':  'linkedInWebsite.name must be a string',        
                }),
            }),

        githubWebsite: Joi.object({
            link: Joi.string()
                .messages({
                    'string.empty': 'githubWebsite.link is empty',
                    'string.base':  'githubWebsite.link must be a string',        
                }),
            name: Joi.string()
                .messages({
                    'string.empty': 'githubWebsite.name is empty',
                    'string.base':  'githubWebsite.name must be a string',        
                }),
            }),
        })
        .options({
            allowUnknown: true, 
            abortEarly: false 
        })
        .or('firstname', 'lastname', 'username', 'email', 'dateofbirth', 'city', 'country', 'gender', 'isAdmin', 'personalWebsite', 'linkedInWebsite', 'githubWebsite')

}

export { UpdateUsersProfileValidation }
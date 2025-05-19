import { Schema, model, Types } from 'mongoose'
import bcrypt                   from 'bcryptjs'

interface IUser {
    _id?:             Types.ObjectId
    firstname?:       string
    lastname?:        string
    username?:        string
    email?:           string
    password?:        string
    avatar?:          string
    dateOfBirth?:     string
    city?:            string
    country?:         string
    gender?:          string
    isAdmin?:         boolean
    personalWebsite?: Map<string, string>
    linkedInWebsite?: Map<string, string>
    githubWebsite?:   Map<string, string>
    skills?:      [ { type: Schema.Types.ObjectId, ref: 'skills' } ]
    portfolios?:  [ { type: Schema.Types.ObjectId, ref: 'portfolios' } ]
    experiences?: [ { type: Schema.Types.ObjectId, ref: 'experiences' } ]
    educations?:  [ { type: Schema.Types.ObjectId, ref: 'educations' } ]
    messages?:    [ { type: Schema.Types.ObjectId, ref: 'messages' } ]
    cvs?:         [ { type: Schema.Types.ObjectId, ref: 'messages' } ]
}

const userSchema = new Schema<IUser>({
    firstname: {
        type: String, 
        required: true,
        unique: false,
    },
    lastname: {
        type: String, 
        required: true,
        unique: false,
    },
    username: {
        type: String, 
        required: true, 
        unique: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true,
        unique: true,
    },
    avatar: {
        type: String, 
        required: false,
        unique: false,
        default: 'images/profile.png'
    },
    dateOfBirth: {
        type: String, 
        required: true,
        unique: false,
    },
    city: {
        type: String, 
        required: true,
        unique: false,
    },
    country: {
        type: String, 
        required: true,
        unique: false,
    },
    gender: {
        type: String,
        required: true,
        unique: false,
    },
    isAdmin: {
        type: Boolean, 
        required: true, 
        default: false,
    },
    personalWebsite: {
        link: { 
            type: String,
            required: false, 
            unique: false, 
        },
        name: { 
            type: String,
            required: false, 
            unique: false, 
        },
    },
    linkedInWebsite: {
        link: { 
            type: String,
            required: false, 
            unique: false, 
        },
        name: { 
            type: String,
            required: false, 
            unique: false, 
        },   
    },
    githubWebsite: {
        link: { 
            type: String,
            required: false, 
            unique: false, 
        },
        name: { 
            type: String,
            required: false, 
            unique: false, 
        },   
    },
    skills:      [ { type: Schema.Types.ObjectId, ref: 'skills' } ],
    portfolios:  [ { type: Schema.Types.ObjectId, ref: 'portfolios' } ],
    experiences: [ { type: Schema.Types.ObjectId, ref: 'experiences' } ],
    educations:  [ { type: Schema.Types.ObjectId, ref: 'educations' } ],
    messages:    [ { type: Schema.Types.ObjectId, ref: 'messages' } ],
    cvs:         [ { type: Schema.Types.ObjectId, ref: 'cvs' } ],
    }, {
        timestamps: true
    }
)

// decrypt password
userSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// encrypt password
userSchema.methods.encyptPassword = async function(password: string) {
    const salt = await bcrypt.genSalt(10)
    let encPassword = await bcrypt.hash(password, salt)
    return encPassword
}

// encrypt password (encrypt password on save method)
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { next() }
    const salt = await bcrypt.genSalt(10)
    this.password! = await bcrypt.hash(this.password!, salt) 
})
  
const UserModel = model<IUser>('users', userSchema)

export { IUser, UserModel }
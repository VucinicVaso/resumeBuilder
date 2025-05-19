import { Schema, model, Types } from 'mongoose'

interface IEducation {
    _id?:         Types.ObjectId
    title?:       string
    link?:        string
    description?: string
    date?:        string
    user?:        Types.ObjectId
}

const educationSchema = new Schema<IEducation>({
    title: {
        type: String,
        required: true,
        unique: false
    },
    link: {
        type: String,
        unique: false
    },
    description: {
        type: String,
        unique: false
    },
    date: {
        type: String, 
        required: true,
        unique: false
    },
    user: { 
        type: Types.ObjectId, 
        ref: 'users',
        required: true
    },
}, {
        timestamps: true
    }
)
  
const EducationModel = model<IEducation>('educations', educationSchema)

export { IEducation, EducationModel }
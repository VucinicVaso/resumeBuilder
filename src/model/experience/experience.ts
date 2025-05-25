import { Schema, model, Types } from 'mongoose'

interface IExperience {
    _id?:         Types.ObjectId
    title?:       string
    link?:        string
    position?:    string
    description?: string
    dateFrom?:    string
    dateTo?:      string
    totalTime?:   string
    user?:        Types.ObjectId
}

const experienceSchema = new Schema<IExperience>({
    title: {
        type: String, 
        required: true,
        unique: false,
    },
    link: {
        type: String,
        unique: false
    },
    position: {
        type: String, 
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    dateFrom: {
        type: String,
        required: false,
        unique: false
    },
    dateTo: {
        type: String,
        required: false,
        unique: false
    },
    totalTime: {
        type: String,
        required: false,
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
  
const ExperienceModel = model<IExperience>('experiences', experienceSchema)

export { IExperience, ExperienceModel }
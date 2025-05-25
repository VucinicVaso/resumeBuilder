import { Schema, model, Types } from 'mongoose'

interface ISkill {
    _id?:       Types.ObjectId
    title?:     string
    icon?:      string
    subskills?: string[]
    user?:      Types.ObjectId
}

const skillSchema = new Schema<ISkill>({
    title: {
        type: String,
        required: true,
        unique: false
    },
    icon: {
        type: String, 
        required: false,
        unique: false
    },
    subskills: {
        type: [String],
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
  
const SkillModel = model<ISkill>('skills', skillSchema)

export { ISkill, SkillModel }
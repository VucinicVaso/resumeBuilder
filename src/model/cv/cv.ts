import { Schema, model, Types } from 'mongoose'

interface ICv {
    _id?:      Types.ObjectId
    file?:     string
    isActive?: boolean
    user?:     Types.ObjectId
}

const cvSchema = new Schema<ICv>({
    file: {
        type: String,
        required: true,
        unique: false
    },
    isActive: {
        type: Boolean, 
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
  
const CvModel = model<ICv>('cvs', cvSchema)

export { ICv, CvModel }
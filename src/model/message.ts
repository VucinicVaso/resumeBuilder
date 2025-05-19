import { Schema, model, Types } from 'mongoose'

interface IMessage {
    _id?:     Types.ObjectId
    name?:    string
    email?:   string
    subject?: string
    message?: string
    isRead?:  boolean
    user?:    Types.ObjectId
}

const messageSchema = new Schema<IMessage>({
    name: {
        type: String, 
        required: false,
        unique: false
    },
    email: {
        type: String, 
        required: true,
        unique: false
    },
    subject: {
        type: String, 
        required: false,
        unique: false
    },
    message: {
        type: String, 
        required: false,
        unique: false
    },
    isRead: {
        type: Boolean,
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
  
const MessageModel = model<IMessage>('messages', messageSchema)

export { IMessage, MessageModel }
import { Types } from 'mongoose'

export interface IUpdateCV {
    _id?: Types.ObjectId
    isActive?: boolean
}
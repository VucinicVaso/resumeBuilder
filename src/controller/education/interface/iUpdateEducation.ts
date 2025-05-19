import { Types } from 'mongoose'

export interface IUpdateEducation {
    _id?: Types.ObjectId
    title?: string
    link?: string
    description?: string
    date?: string
}
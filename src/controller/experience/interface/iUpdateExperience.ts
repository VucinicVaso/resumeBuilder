import { Types } from 'mongoose'

export interface IUpdateExperience {
    _id?: Types.ObjectId
    title?: string
    link?: string
    position?: string
    description?: string
    dateFrom?: string
    dateTo?: string
    totalTime?: string
}
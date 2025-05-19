import { Types } from 'mongoose'

export interface IUpdatePortfolio {
    _id?: Types.ObjectId
    title?: string
    description?: string
    type?: string
    iosLink?: string
    androidLink?: string
    websiteLink?: string
    gitLink?: string
    files?: string[]
}
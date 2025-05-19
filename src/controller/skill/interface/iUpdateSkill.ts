import { Types } from 'mongoose'

export interface IUpdateSkill {
    _id?: Types.ObjectId
    title?: string
    icon?: string
    subskills?: string[]
}
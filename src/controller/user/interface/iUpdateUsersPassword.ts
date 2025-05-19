import { Types } from 'mongoose'

export interface IUpdateUsersPassword {
    _id?:     Types.ObjectId
    password: string
}
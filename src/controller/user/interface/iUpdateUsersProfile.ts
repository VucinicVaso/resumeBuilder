import { Types } from 'mongoose'

export interface IUpdateUsersProfile {
    _id?:             Types.ObjectId
    firstname?:       string
    lastname?:        string
    username?:        string
    email?:           string
    avatar?:          string
    dateOfBirth?:     string
    city?:            string
    country?:         string
    gender?:          string
    isAdmin?:         boolean
    personalWebsite?: Map<string, string>
    linkedInWebsite?: Map<string, string>
    githubWebsite?:   Map<string, string>
}
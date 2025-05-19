import { Schema, model, Types } from 'mongoose'

interface IPortfolio {
    _id?:         Types.ObjectId
    title?:       string
    description?: string
    type?:        string
    iosLink?:     string
    androidLink?: string
    websiteLink?: string
    gitLink?:     string
    files?:       string[]
    user?:        Types.ObjectId
}

const portfolioSchema = new Schema<IPortfolio>({
    title: {
        type: String, 
        required: true,
        unique: false,
    },
    description: {
        type: String, 
        required: false,
        unique: false
    },
    type: {
        type: String, 
        required: false,
        unique: false
    },
    iosLink: {
        type: String, 
        required: false,
        unique: false
    },
    androidLink: {
        type: String, 
        required: false,
        unique: false
    },
    websiteLink: {
        type: String, 
        required: false,
        unique: false
    },
    gitLink: {
        type: String, 
        required: false,
        unique: false
    },
    files: {
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
  
const PortfolioModel = model<IPortfolio>('portoflios', portfolioSchema)

export { IPortfolio, PortfolioModel }
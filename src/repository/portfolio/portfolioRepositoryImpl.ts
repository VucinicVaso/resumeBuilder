import{ Types }                       from 'mongoose'
import { IPortfolio, PortfolioModel } from '../../model/portfolio/portfolio'
import PortfolioRepository            from './portfolioRepository'

class PortfolioRepositoryImpl extends PortfolioRepository {

    constructor() {
        super()
    }

    async save(iP: IPortfolio) : Promise<boolean> {
        return await PortfolioModel.create({
            title: iP.title,
            description: iP.description,
            type: iP.type,
            iosLink: iP.iosLink,
            androidLink: iP.androidLink,
            websiteLink: iP.websiteLink,
            gitLink: iP.gitLink,
            files: iP.files,
            user: iP.user
        })
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iP: IPortfolio) : Promise<boolean> {
        return await PortfolioModel.updateOne({ _id: iP._id }, iP)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await PortfolioModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<IPortfolio[]> {
        return await PortfolioModel.find({})
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<IPortfolio | null> {
        return await PortfolioModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default PortfolioRepositoryImpl
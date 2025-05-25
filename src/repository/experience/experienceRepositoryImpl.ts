import{ Types }                         from 'mongoose'
import { IExperience, ExperienceModel } from '../../model/experience'
import ExperienceRepository             from './experienceRepository'

class ExperienceRepositoryImpl extends ExperienceRepository {

    constructor() {
        super()
    }

    async save(iE: IExperience) : Promise<boolean> {
        return await ExperienceModel.create({
            title: iE.title,
            link: iE.link === undefined || iE.link === null || iE.link === "" ? "#" : iE.link,
            position: iE.position,
            description: iE.description,
            dateFrom: iE.dateFrom,
            dateTo: iE.dateTo,
            totalTime: iE.totalTime,
            user: iE.user,
        })
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iE: IExperience) : Promise<boolean> {
        return await ExperienceModel.updateOne({ _id: iE._id }, iE)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await ExperienceModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<IExperience[]> {
        return await ExperienceModel.find({})
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<IExperience | null> {
        return await ExperienceModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default ExperienceRepositoryImpl
import{ Types }                       from 'mongoose'
import { IEducation, EducationModel } from '../../model/education'
import EducationRepository            from './educationRepository'

class EducationRepositoryImpl extends EducationRepository {

    constructor() {
        super()
    }

    async save(iE: IEducation) : Promise<boolean> {
        return await EducationModel.create({
            title: iE.title,
            link: iE.link === undefined || iE.link === null || iE.link === "" ? "#" : iE.link,
            description: iE.description,
            date: iE.date,
            user: iE.user,
        })
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iE: IEducation) : Promise<boolean> {
        return await EducationModel.updateOne({ _id: iE._id }, iE)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await EducationModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<IEducation[]> {
        return await EducationModel.find({})
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<IEducation | null> {
        return await EducationModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default EducationRepositoryImpl
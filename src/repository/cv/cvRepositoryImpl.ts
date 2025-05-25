import{ Types }         from 'mongoose'
import { ICv, CvModel } from '../../model/cv'
import CvRepository     from '../cvRepository'

class CvRepositoryImpl extends CvRepository {

    constructor() {
        super()
    }

    async save(iCv: ICv) : Promise<boolean> {
        return await CvModel.create(iCv)
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iCv: ICv) : Promise<boolean> {
        return await CvModel.updateOne({ _id: iCv._id }, iCv)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await CvModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<ICv[]> {
        return await CvModel.find({})
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<ICv | null> {
        return await CvModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default CvRepositoryImpl
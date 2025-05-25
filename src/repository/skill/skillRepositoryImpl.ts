import{ Types }               from 'mongoose'
import { ISkill, SkillModel } from '../../model/skill/skill'
import SkillRepository        from './skillRepository'

class SkillRepositoryImpl extends SkillRepository {

    constructor() {
        super()
    }

    async save(iS: ISkill) : Promise<boolean> {
        return await SkillModel.create({
            title: iS.title,
            icon: iS.icon,
            subskills: iS.subskills,
            user: iS.user,
        })
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iS: ISkill) : Promise<boolean> {
        return await SkillModel.updateOne({ _id: iS._id }, iS)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await SkillModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<ISkill[]> {
        return await SkillModel.find({})
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<ISkill | null> {
        return await SkillModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default SkillRepositoryImpl
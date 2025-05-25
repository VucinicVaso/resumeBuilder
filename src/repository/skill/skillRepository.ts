import { ISkill } from '../../model/skill'

abstract class SkillRepository {

    abstract save(iS: ISkill) : Promise<boolean>

    abstract update(iS: ISkill) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<ISkill[]>

    abstract getById(id: string): Promise<ISkill | null>
}

export default SkillRepository
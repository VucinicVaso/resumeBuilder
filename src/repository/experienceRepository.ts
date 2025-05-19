import { IExperience } from '../model/experience'

abstract class ExperienceRepository {

    abstract save(iE: IExperience) : Promise<boolean>

    abstract update(iE: IExperience) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<IExperience[]>

    abstract getById(id: string): Promise<IExperience | null>

}

export default ExperienceRepository
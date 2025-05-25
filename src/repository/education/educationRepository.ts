import { IEducation } from '../../model/education'

abstract class EducationRepository {

    abstract save(iE: IEducation) : Promise<boolean>

    abstract update(iE: IEducation) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<IEducation[]>

    abstract getById(id: string): Promise<IEducation | null>

}

export default EducationRepository
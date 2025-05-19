import { ICv } from '../model/cv'

abstract class CvRepository {

    abstract save(iCv: ICv) : Promise<boolean>

    abstract update(iCv: ICv) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract getAll(): Promise<ICv[]>

    abstract getById(id: string): Promise<ICv | null>

}

export default CvRepository
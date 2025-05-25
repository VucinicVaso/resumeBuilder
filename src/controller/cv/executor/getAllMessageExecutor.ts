import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICv }                             from '../../../model/cv/cv'
import CvRepository                        from '../../../repository/cv/cvRepositoryImpl'

class GetAllMessageExecutor implements MessageExecutor {

    private cvRepository?: CvRepository

    constructor(cvRepository: CvRepository) {
        this.cvRepository = cvRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: ICv[] = await this.cvRepository!.getAll()
            
            response.json({ success: true, cvs: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor
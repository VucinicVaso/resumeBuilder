import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { ICv }                             from '../../../model/cv'
import CvRepository                        from '../../../repository/impl/cvRepositoryImpl'

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
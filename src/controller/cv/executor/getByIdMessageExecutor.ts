import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetCVById }                      from '../interface/iGetCVById'
import { ICv }                             from '../../../model/cv/cv'
import CvRepository                        from '../../../repository/cv/cvRepositoryImpl'

class GetByIdMessageExecutor implements MessageExecutor {

    private cvRepository?: CvRepository

    constructor(cvRepository: CvRepository) {
        this.cvRepository = cvRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGcVbId: IGetCVById = request.body
            let result: ICv | null = await this.cvRepository!.getById(iGcVbId._id)
            if(result == null) throw `CV ${iGcVbId._id} not found.`

            response.json({ success: true, cv: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor
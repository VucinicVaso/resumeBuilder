import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroyCV }                      from '../interface/iDestroyCV'
import CvRepository                        from '../../../repository/impl/cvRepositoryImpl'

class DestroyMessageExecutor implements MessageExecutor {

    private cvRepository?: CvRepository

    constructor(cvRepository: CvRepository) {
        this.cvRepository = cvRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try{
            const iDcV: IDestroyCV = request.body
            // delete file from assets if exists
            const result: boolean = await this.cvRepository!.delete(iDcV._id!)
            if(!result) throw `Something went wrong with deleting CV ${iDcV._id}.`

            response.json({ success: true, message: `CV ${iDcV._id} deleted successfully.` })
        }catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor
import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IDestroySkill }                   from '../interface/iDestroySkill'
import SkillRepository                     from '../../../repository/skillRepository'

class DestroyMessageExecutor implements MessageExecutor {

    private skillRepository?: SkillRepository

    constructor(skillRepository: SkillRepository) {
        this.skillRepository = skillRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iDs: IDestroySkill = request.body
            const result: boolean = await this.skillRepository!.delete(iDs._id!)
            if(!result) throw `Something went wrong with deleting education ${iDs._id}.`
            
            response.json({ success: true, message: `Skill ${iDs._id} deleted succefully.` })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default DestroyMessageExecutor
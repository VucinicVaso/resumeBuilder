import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../service/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import { IGetSkillById }                   from '../interface/iGetSkillById'
import { ISkill }                          from '../../../model/skill'
import SkillRepository                     from '../../../repository/skill/skillRepository'

class GetByIdMessageExecutor implements MessageExecutor {

    private skillRepository?: SkillRepository

    constructor(skillRepository: SkillRepository) {
        this.skillRepository = skillRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const iGsBi: IGetSkillById = request.body
            let result : ISkill | null = await this.skillRepository!.getById(iGsBi._id!)
            if(result == null) throw `Skill ${iGsBi._id} not found.`
            
            response.json({ success: true, skill: result })
        } catch(e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetByIdMessageExecutor
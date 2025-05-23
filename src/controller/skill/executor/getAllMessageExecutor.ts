import { Request, Response, NextFunction } from 'express'
import MessageExecutor                     from '../../../util/executor/messageExecutor'
import AppMiddleware                       from '../../../util/middleware/appMiddleware'
import SkillRepository                     from '../../../repository/skillRepository'
import { ISkill }                          from '../../../model/skill'

class GetAllMessageExecutor implements MessageExecutor {

    private skillRepository?: SkillRepository

    constructor(skillRepository: SkillRepository) {
        this.skillRepository = skillRepository
    }

    public async execute(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            let result: ISkill[] = await this.skillRepository!.getAll()
            
            response.json({ success: true, skills: result })
        } catch (e: any) {
            AppMiddleware.errorHandler(new Error(e), request, response, next)
        }
    }

}

export default GetAllMessageExecutor
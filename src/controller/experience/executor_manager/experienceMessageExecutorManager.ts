import JoiValidationMiddleware         from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware     from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthorizationMiddleware    from '../../../util/middleware/adminAuthorizationMiddleware'
import MessageExecutorManager          from '../../../service/executor/messageExecutorManager'
import UserRepository                  from '../../../repository/userRepository'
import UserRepositoryImpl              from '../../../repository/impl/userRepositoryImpl'
import ExperienceRepository            from '../../../repository/experienceRepository'
import ExperienceRepositoryImpl        from '../../../repository/impl/experienceRepositoryImpl'
import CreateMessageExecutor           from '../executor/createMessageExecutor'
import UpdateMessageExecutor           from '../executor/updateMessageExecutor'
import DestroyMessageExecutor          from '../executor/destroyMessageExecutor'
import GetAllMessageExecutor           from '../executor/getAllMessageExecutor'
import GetByIdMessageExecutor          from '../executor/getByIdMessageExecutor'
import { GetExperienceByIdValidation } from '../validator/getByIdValidator'
import { CreateExperienceValidation }  from '../validator/createValidator'
import { UpdateExperienceValidation }  from '../validator/updateValidator'
import { DestroyExperienceValidation } from '../validator/destroyValidator'

class ExperienceMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private experienceRepository?: ExperienceRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.experienceRepository = new ExperienceRepositoryImpl()

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        GetExperienceByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(this.experienceRepository)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GetAllMessageExecutor(this.experienceRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        CreateExperienceValidation.validationSchema,
                        new CreateMessageExecutor(this.experienceRepository)
                    )
                )
            )
        )

        this.register(
            'update',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        UpdateExperienceValidation.validationSchema,
                        new UpdateMessageExecutor(this.experienceRepository)
                    )
                )
            )
        )

        this.register(
            'destroy',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        DestroyExperienceValidation.validationSchema,
                        new DestroyMessageExecutor(this.experienceRepository)
                    )
                )
            )
        )

    }

}

export default ExperienceMessageExecutorManager
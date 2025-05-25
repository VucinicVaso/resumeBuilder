import JoiValidationMiddleware        from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware    from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthorizationMiddleware   from '../../../util/middleware/adminAuthorizationMiddleware'
import MessageExecutorManager         from '../../../service/executor/messageExecutorManager'
import UserRepository                 from '../../../repository/user/userRepository'
import UserRepositoryImpl             from '../../../repository/user/userRepositoryImpl'
import PortfolioRepository            from '../../../repository/portfolio/portfolioRepository'
import PortfolioRepositoryImpl        from '../../../repository/portfolio/portfolioRepositoryImpl'
import CreateMessageExecutor          from '../executor/createMessageExecutor'
import UpdateMessageExecutor          from '../executor/updateMessageExecutor'
import DestroyMessageExecutor         from '../executor/destroyMessageExecutor'
import GetAllMessageExecutor          from '../executor/getAllMessageExecutor'
import GetByIdMessageExecutor         from '../executor/getByIdMessageExecutor'
import { GetPortfolioByIdValidation } from '../validator/getByIdValidator'
import { CreatePortfolioValidation }  from '../validator/createValidator'
import { UpdatePortfolioValidation }  from '../validator/updateValidator'
import { DestroyPortfolioValidation } from '../validator/destroyValidator'

class PortfolioMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private portfolioRepository?: PortfolioRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.portfolioRepository = new PortfolioRepositoryImpl()

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        GetPortfolioByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(this.portfolioRepository)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GetAllMessageExecutor(this.portfolioRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        CreatePortfolioValidation.validationSchema,
                        new CreateMessageExecutor(this.portfolioRepository)
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
                        UpdatePortfolioValidation.validationSchema,
                        new UpdateMessageExecutor(this.portfolioRepository)
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
                        DestroyPortfolioValidation.validationSchema,
                        new DestroyMessageExecutor(this.portfolioRepository)
                    )
                )
            )
        )

    }

}

export default PortfolioMessageExecutorManager
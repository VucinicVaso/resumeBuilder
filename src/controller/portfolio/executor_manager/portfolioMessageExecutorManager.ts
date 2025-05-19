import JoiValidationMiddleware        from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware    from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthoritizationMiddleware from '../../../util/middleware/adminAuthoritizationMiddleware'
import MessageExecutorManager         from '../../../util/executor/messageExecutorManager'
import UserRepository                 from '../../../repository/userRepository'
import UserRepositoryImpl             from '../../../repository/impl/userRepositoryImpl'
import PortfolioRepository            from '../../../repository/portfolioRepository'
import PortfolioRepositoryImpl        from '../../../repository/impl/portfolioRepositoryImpl'
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
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
                    new GetAllMessageExecutor(this.portfolioRepository)
                )
            )
        )

        this.register(
            'create',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
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
                new AdminAuthoritizationMiddleware(
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
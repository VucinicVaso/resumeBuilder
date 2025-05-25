import JoiValidationMiddleware      from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware  from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthorizationMiddleware from '../../../util/middleware/adminAuthorizationMiddleware'
import MessageExecutorManager       from '../../../service/executor/messageExecutorManager'
import UserRepository               from '../../../repository/user/userRepository'
import UserRepositoryImpl           from '../../../repository/user/userRepositoryImpl'
import CvRepository                 from '../../../repository/cv/cvRepository'
import CvRepositoryImpl             from '../../../repository/cv/cvRepositoryImpl'
import GenerateMessageExecutor      from '../executor/generateMessageExecutor'
import DestroyMessageExecutor       from '../executor/destroyMessageExecutor'
import GetByIdMessageExecutor       from '../executor/getByIdMessageExecutor'
import GetAllMessageExecutor        from '../executor/getAllMessageExecutor'
import UploadMessageExecutor        from '../executor/uploadMessageExecutor'
import { UpdateCvValidation }       from '../validation/updateValidator'
import { DestroyCvValidation }      from '../validation/destroyValidator'
import { GetCvByIdValidation }      from '../validation/getByIdValidator'
import { UploadCvValidation }       from '../validation/uploadValidator'

class CvMessageExecutorManager extends MessageExecutorManager {

    private userRepository?: UserRepository
    private cvRepository?: CvRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()
        this.cvRepository = new CvRepositoryImpl()

        this.register(
            'generate',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GenerateMessageExecutor(
                        this.cvRepository
                    )
                )
            )
        )

        this.register(
            'upload',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        UploadCvValidation.validationSchema,
                        new UploadMessageExecutor(
                            this.cvRepository
                        )
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
                        DestroyCvValidation.validationSchema,
                        new DestroyMessageExecutor(
                            this.cvRepository
                        )
                    )
                )
            )
        )

        this.register(
            'getById',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new JoiValidationMiddleware(
                        GetCvByIdValidation.validationSchema,
                        new GetByIdMessageExecutor(
                            this.cvRepository
                        )
                    )
                )
            )
        )
        
        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthorizationMiddleware(
                    new GetAllMessageExecutor(
                        this.cvRepository
                    )
                )
            )
        )

    }

}

export default CvMessageExecutorManager
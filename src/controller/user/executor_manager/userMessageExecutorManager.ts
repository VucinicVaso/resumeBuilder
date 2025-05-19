import JoiValidationMiddleware           from '../../../util/middleware/joiValidationMiddleware'
import JWTAuthenticationMiddleware       from '../../../util/middleware/jwtAuthenticationMiddleware'
import AdminAuthoritizationMiddleware    from '../../../util/middleware/adminAuthoritizationMiddleware'
import MessageExecutorMenager            from '../../../util/executor/messageExecutorManager'
import UserRepository                    from '../../../repository/userRepository'
import UserRepositoryImpl                from '../../../repository/impl/userRepositoryImpl'
import GetUserByIdMessageExecutor        from '../executor/getUserByIdMessageExecutor'
import UpdateProfileMessageExecutor      from '../executor/updateProfileMessageExecutor'
import UpdatePasswordMessageExecutor     from '../executor/updatePasswordMessageExecutor'
import UpdateAvatarMessageExecutor       from '../executor/updateAvatarMessageExecutor'
import DestroyUserMessageExecutor        from '../executor/destroyUserMessageExecutor'
import GetAllUsersMessageExecutor        from '../executor/getAllUsersMessageExecutor'
import { GetUserByIdValidation }         from '../validator/getByIdValidation'
import { DestroyUserValidation }         from '../validator/destroyValidation'
import { UpdateUsersProfileValidation }  from '../validator/updateProfileValidator'
import { UpdateUsersPasswordValidation } from '../validator/updatePasswordValidator'

class UserMessageExecutorMenager extends MessageExecutorMenager {

    private userRepository?: UserRepository

    constructor() {
        super()
        this.userRepository = new UserRepositoryImpl()

        this.register(
            'getById', 
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new JoiValidationMiddleware(
                        GetUserByIdValidation.validationSchema,
                        new GetUserByIdMessageExecutor(this.userRepository!)
                    )
                )
            )
        )

        this.register(
            'getAll',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new GetAllUsersMessageExecutor(this.userRepository!)
                )
            )
        )

        this.register(
            'updateProfile',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new JoiValidationMiddleware(
                        UpdateUsersProfileValidation.validationSchema,
                        new UpdateProfileMessageExecutor(this.userRepository!)
                    )
                )
            )
        )

        this.register(
            'updateAvatar',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new UpdateAvatarMessageExecutor(this.userRepository!)
                )
            )
        )

        this.register(
            'updatePassword',
            new JWTAuthenticationMiddleware(
                this.userRepository,
                new AdminAuthoritizationMiddleware(
                    new JoiValidationMiddleware(
                        UpdateUsersPasswordValidation.validationSchema,
                        new UpdatePasswordMessageExecutor(this.userRepository!)
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
                        DestroyUserValidation.validationSchema,
                        new DestroyUserMessageExecutor(this.userRepository!)
                    )
                )
            )
        )
    }

}

export default UserMessageExecutorMenager
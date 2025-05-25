import{ Types }                from 'mongoose'
import bcrypt                  from 'bcryptjs'
import { IUser, UserModel }    from '../../model/user/user'
import JwtGenerator            from '../../util/jwt/jwtGenerator'
import Environment             from '../../util/enviroment/environment'
import UserRepository          from './userRepository'

class UserRepositoryImpl extends UserRepository {

    private env: Environment

    constructor() {
        super()
        this.env = Environment.getInstance()
    }

    async save(iU: IUser) : Promise<boolean> {
        return await UserModel.create({
                firstname: iU.firstname,
                lastname: iU.lastname,
                username: `${ iU.firstname!.toLowerCase()}.${iU.lastname!.toLowerCase()}.${Math.floor(Math.random() * 101).toString()}`,
                email: iU.email,
                password: iU.password,
                dateOfBirth: iU.dateOfBirth,
                city: iU.city,
                country: iU.country,
                gender: iU.gender,
                isAdmin: await this.countUsers() < 1 ? 'true' : 'false',
            })
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async update(iU: IUser) : Promise<boolean> {
        return await UserModel.updateOne({ _id: iU._id }, iU)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await UserModel.deleteOne({ _id: new Types.ObjectId(id), 'isAdmin': { '$ne': true } })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async validatePassword(passwordToCheck: string, password: string): Promise<boolean> {
        return await bcrypt.compare(passwordToCheck, password)
    }

    async countUsers(): Promise<number> { 
        return await UserModel.countDocuments()
            .then(r => r)
            .catch(e => { throw e })
    }

    async getAll(): Promise<IUser[]> {
        return await UserModel.find({})
            .select('-cvs -skills -portfolios -experiences -educations -messages -news -password -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id!)
            .select('-cvs -skills -portfolios -experiences -educations -messages -news -password -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email: email! })
            .select('-cvs -skills -portfolios -experiences -educations -messages -news --updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async getAdmin(): Promise<IUser | null> {
        return await UserModel.findOne({ 'isAdmin': true })
            .select('-cvs -skills -portfolios -experiences -educations -messages -news -password --updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

    async generateJwtToken(id: Types.ObjectId) : Promise<string> {
        return JwtGenerator!.generate(id!, this.env!.getJwtSecret())
    }

}

export default UserRepositoryImpl
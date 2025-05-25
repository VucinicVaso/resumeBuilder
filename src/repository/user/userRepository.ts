import{ Types } from 'mongoose'
import { IUser } from '../../model/user'

abstract class UserRepository {

    abstract save(iU: IUser) : Promise<boolean>

    abstract update(iU: IUser) : Promise<boolean>

    abstract delete(id: string) : Promise<boolean>

    abstract validatePassword(passwordToCheck: string, password: string): Promise<boolean>

    abstract countUsers(): Promise<number>

    abstract getAll(): Promise<IUser[]>

    abstract getById(id: string): Promise<IUser | null>

    abstract getByEmail(email: string): Promise<IUser | null>

    abstract getAdmin(): Promise<IUser | null>

    abstract generateJwtToken(id: Types.ObjectId) : Promise<string>

}

export default UserRepository
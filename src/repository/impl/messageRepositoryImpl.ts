import{ Types }                   from 'mongoose'
import { IMessage, MessageModel } from '../../model/message'
import MessageRepository          from '../messageRepository'

class MessageRepositoryImpl extends MessageRepository {

    constructor() {
        super()
    }

    async save(iM: IMessage) : Promise<boolean> {
        return await MessageModel.create(iM)
        .then(r => r != null ? true : false)
        .catch(e => { throw e })
    }

    async update(iM: IMessage) : Promise<boolean> {
        return await MessageModel.updateOne({ _id: iM._id }, iM)
            .then(r => r != null ? true : false)
            .catch(e => { throw e })
    }

    async delete(id: string) : Promise<boolean> {
        return await MessageModel.deleteOne({ _id: new Types.ObjectId(id) })
            .then(r => r.deletedCount > 0 ? true : false)
            .catch(e => { throw e })
    }

    async getAll(): Promise<IMessage[]> {
        return await MessageModel.find({})
            .select('-user -updatedAt -__v')
            .sort({ createdAt: -1 })
            .then(r => r)
            .catch(e => { throw e })
    }

    async getById(id: string): Promise<IMessage | null> {
        return await MessageModel.findById(id!)
            .select('-user -updatedAt -__v')
            .then(r => r)
            .catch(e => { throw e })
    }

}

export default MessageRepositoryImpl
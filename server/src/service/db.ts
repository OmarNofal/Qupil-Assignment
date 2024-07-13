import mongoose, { Mongoose } from 'mongoose'
import 'dotenv/config'
const connection_string: string = process.env.mongo as string

function connectToDatabase(
    onConnected: (mongoose: Mongoose) => void,
    onError: (err: any) => void,
) {
    mongoose.connect(connection_string).then(onConnected).catch(onError)
}

export default connectToDatabase

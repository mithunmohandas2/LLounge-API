import mongoose from "mongoose";
require('dotenv').config()

export const connectDb = async () => {
    try {
        const mongo_uri = process.env.MongoDB_Link!
        await mongoose.connect(mongo_uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log((error as Error).message)
    }
}
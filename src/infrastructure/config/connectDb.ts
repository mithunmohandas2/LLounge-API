import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        const mongo_uri = 'mongodb+srv://learnerslounge2:B083oB5UpVii8fiV@llounge.ptug85v.mongodb.net/'
        await mongoose.connect(mongo_uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}
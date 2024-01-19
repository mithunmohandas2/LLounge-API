import { ObjectId } from 'mongoose'
import User from '../../domain/user'
import { UserModel } from '../database/userModel'
import UserRepository from '../interface/userController'
import { certificateModel } from '../database/certificateModel'
import { certificate } from '../../domain/courses'
import { ParsedQs } from "qs";

class userRepository implements UserRepository {
    async save(user: User) {
        const newUser = new UserModel(user)
        await newUser.save()
        return {
            status: 200,
            success: true,
            data: newUser,
            message: 'User registration successful',
        }
    }

    async findByEmail(email: string) {
        console.log('email exist check')
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return null
        }
    }

    async findByPhone(phone: string) {
        console.log('phone exist check')
        const existingUser = await UserModel.findOne({ phone })
        if (existingUser) {
            return {
                status: 200,
                success: true,
                data: existingUser,
                message: 'User details found in database'
            }
        }
        else {
            return null
        }
    }

 async getCertificate(query: ParsedQs) {
        try {
            console.log("first")
            const courseId = query.courseId as unknown as ObjectId; //string to ObjectID
            const userId = query.userId as unknown as ObjectId; //string to ObjectID
            const response = await certificateModel.findOne({ courseId, userId })
            console.log("certificateModel saved? =>", response)   //test
            if (response) {
                return {
                    status: 200,
                    data: response,
                    message: 'Certificate found'
                }
            }
            else {
                return {
                    status: 404,
                    message: 'No certificate found'
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }


    async issueCertificate(data: certificate) {
        try {
            const courseId = data.courseId as unknown as ObjectId; //string to ObjectID
            const userId = data.userId as unknown as ObjectId; //string to ObjectID 
            const courseName = data.courseName;
            const userName = data.userName;
            const tutorName = data.tutorName;
            const marks = data.marks;

            const response = await certificateModel.updateOne({ courseId, userId }, { courseName, userName, tutorName, marks }, { upsert: true })
            // console.log("certificate saved? =>", response) //test
            return {
                status: 200,
                data: response,
                message: 'certificate issued'
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }
   

}
export default userRepository
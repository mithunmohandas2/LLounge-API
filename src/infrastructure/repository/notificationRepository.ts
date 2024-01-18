// notificationRepository
import { ObjectId } from 'mongoose';
import { notifications } from '../../domain/notification';
import { notificationModel } from '../database/notificationModel';
import { ParsedQs } from "qs";


class notificationRepository {

    async createNote(data: notifications) {
        try {
            const senderId = data.senderId as unknown as ObjectId; //string to ObjectID
            const receiverId = data.receiverId as unknown as ObjectId; //string to ObjectID 
            const courseId = data.courseId as unknown as ObjectId; //string to ObjectID
            const message = data.message

            const newNotification = new notificationModel({ senderId, receiverId, courseId, message })
            const response = await newNotification.save()
            // console.log("notification saved? =>", response) //test
            if (response) {
                return {
                    status: 200,
                    data: response,
                    message: 'notification added'
                }
            }
            else {
                return {
                    status: 400,
                    message: 'failed to add notification'
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }

    async getNotifications(query: ParsedQs) {
        try {
            const response = await notificationModel.find({ $or: [{ senderId: query._id }, { receiverId: query._id }, { courseId: query._id }] }).sort({ createdAt: -1 })
            // console.log("notification saved? =>", response)   //test
            if (response) {
                return {
                    status: 200,
                    data: response,
                    message: 'notification list'
                }
            }
            else {
                return {
                    status: 400,
                    message: 'failed to fetch notification'
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }

}
export default notificationRepository
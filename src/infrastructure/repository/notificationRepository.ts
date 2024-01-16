// notificationRepository
import { notifications } from '../../domain/notification';
import { notificationModel } from '../database/notificationModel';
import { ParsedQs } from "qs";


class notificationRepository {

    async createNote(data: notifications) {
        try {
            const newNotification = new notificationModel({
                senderId: data.senderId,
                receiverId: data.receiverId,
                message: data.message
            })
            const response = await newNotification.save()
            console.log("notification saved? =>", response)
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
            const response = await notificationModel.find({ $or: [{ senderId: query._id }, { receiverId: query._id }] })
            console.log("notification saved? =>", response)
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
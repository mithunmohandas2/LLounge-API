import { ObjectId } from "mongoose"
import BranchModel from "../database/branchModel";

class courseRepository {

    async findBranchByName(branchName: string) {
        try {
            console.log('Check existing branch')  //test
            const isExists = await BranchModel.findOne({ branchName })
            if (isExists) {
                return {
                    status: 200,
                    message: 'Branch already exists',
                    data: isExists,
                }
            } else {
                return {
                    status: 400,
                    message: 'Branch doesnt exist',
                }
            }

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: (error as Error).message
            }
        }
    }

    async findCourseByNameNBranch(couseName: string, branch:ObjectId) {
        try {
            console.log('Check existing branch')  //test
            const isExists = await CourseModel.findOne({ couseName })
            if (isExists) {
                return {
                    status: 200,
                    message: 'Branch already exists',
                    data: isExists,
                }
            } else {
                return {
                    status: 400,
                    message: 'Branch doesnt exist',
                }
            }

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: (error as Error).message
            }
        }
    }


    async createBranch(branchName: string) {
        try {
            const newBranch = new BranchModel({branchName})
            const branchSave = await newBranch.save()
            if (branchSave) {
                console.log("first", branchSave)
                return {
                    status: 200,
                    message: 'New branch added',
                    data: branchSave,
                }
            }else{
                return {
                    status: 400,
                    message: 'Failed to add new branch',
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
export default courseRepository
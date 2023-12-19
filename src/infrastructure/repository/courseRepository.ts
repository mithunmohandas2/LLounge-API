import { ObjectId } from "mongoose"
import BranchModel from "../database/branchModel";
import CourseModel from "../database/courseModel";
import { Courses, Module } from "../../domain/courses";

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

    async createBranch(branchName: string) {
        try {
            const newBranch = new BranchModel({ branchName: branchName })
            const branchSave = await newBranch.save()
            if (branchSave) {
                console.log("first", branchSave)
                return {
                    status: 200,
                    message: 'New branch added',
                    data: branchSave,
                }
            } else {
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

    async findCourseByName(courseName: string) {
        try {
            console.log('Check existing coursename')  //test
            const isExists = await CourseModel.findOne({ courseName })
            if (isExists) {
                return {
                    status: 200,
                    message: 'course details found',
                    data: isExists,
                }
            } else {
                return {
                    status: 400,
                    message: 'Course not found',
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

    async findCourseById(_id: ObjectId) {
        try {
            console.log('Check existing course by ID')  //test
            const isExists = await CourseModel.findOne({ _id })
            if (isExists) {
                return {
                    status: 200,
                    message: 'course details found',
                    data: isExists,
                }
            } else {
                return {
                    status: 400,
                    message: 'Course not found',
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


    async createCourse(course: Courses) {
        try {
            console.log('create course')  //test
            const newCourse = new CourseModel(course)
            const courseSave = await newCourse.save()
            if (courseSave) {
                console.log("saved Course =>", courseSave)
                return {
                    status: 200,
                    message: 'New course added',
                    data: courseSave,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to add new course',
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

    async addModule(module: Module) {
        try {
            console.log('add module')  //test
            const moduleUpdate = await CourseModel.updateOne({ _id: module.courseId }, { $addToSet: { modules: module } })
            if (moduleUpdate?.modifiedCount > 0) {
                console.log("Saved Module =>", moduleUpdate)
                return {
                    status: 200,
                    message: 'New module added',
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to add new module',
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

    async editCourse(course: Courses) {
        try {
            console.log('edit course')  //test
            const editedCourse = await CourseModel.updateOne({ _id: course.courseId }, { $set: course })
            if (editedCourse) {
                console.log("saved Course =>", editedCourse)
                return {
                    status: 200,
                    message: 'Course edited successfully',
                    data: editedCourse,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to edit course',
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

    async blockCourse(_id: ObjectId, blockStatus: Boolean) {
        try {
            console.log('block/unblock course')  //test
            const statusChange = await CourseModel.updateOne({ _id }, { $set: { isBlocked: blockStatus ? false : true } })
            if (statusChange) {
                console.log("blocked Course =>", statusChange)
                return {
                    status: 200,
                    message: blockStatus ? 'Course unblocked successfully' : "Course blocked successfully",
                    data: statusChange,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to block/unblock course',
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

    async listCoursesById(_id: ObjectId) {
        try {
            console.log('Course Details')  //test
            const courseData = await CourseModel.findOne({ _id})
            if (courseData) {
                console.log("Courses =>", courseData)
                return {
                    status: 200,
                    message: "Course Details",
                    data: courseData,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to fetch course details',
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

    async listCoursesByTutor(tutorId: ObjectId) {
        try {
            console.log('listCourses')  //test
            const allCourses = await CourseModel.find({ tutor : tutorId })
            if (allCourses) {
                console.log("Courses =>", allCourses)
                return {
                    status: 200,
                    message: "Course list",
                    data: allCourses,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to fetch courses',
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

}
export default courseRepository
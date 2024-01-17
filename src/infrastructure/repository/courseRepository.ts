import { ObjectId } from "mongoose"
import BranchModel from "../database/branchModel";
import CourseModel from "../database/courseModel";
import { Courses, Module } from "../../domain/courses";
import { UserModel } from "../database/userModel";
import { enrollmentModel } from "../database/enrollmentModel";

class courseRepository {

    async findBranchByName(branchName: string) {
        try {
            // console.log('Check existing branch')  //test
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
            // console.log('Check existing coursename')  //test
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
            // console.log('Check existing course by ID')  //test
            const isExists = await CourseModel.findOne({ _id }).populate('branchId').populate('tutor')
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
            // console.log('create course')  //test
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
            if (module._id) {
                //edit module scenario
                // console.log('edit module')  //test
                const moduleUpdate = await CourseModel.updateOne({ _id: module.courseId, 'modules._id': module._id }, {
                    $set: {
                        'modules.$.modName': module.modName,
                        'modules.$.content': module.content,
                        'modules.$.duration': module.duration,
                    }
                })
                if (moduleUpdate?.modifiedCount > 0) {
                    console.log("Updated Module =>", moduleUpdate)  //test
                    return {
                        status: 200,
                        message: 'module updated successfully',
                    }
                } else {
                    return {
                        status: 400,
                        message: 'Failed to update module',
                    }
                }
            } else {
                //add module scenario
                // console.log('add module')  //test
                const moduleUpdate = await CourseModel.updateOne({ _id: module.courseId }, { $addToSet: { modules: module } })
                if (moduleUpdate?.modifiedCount > 0) {
                    // console.log("Saved Module =>", moduleUpdate)  //test
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
            }

        } catch (error) {
            return {
                status: 500,
                success: false,
                message: (error as Error).message
            }
        }
    }

    async addMaterials(module: Module) {
        try {
            // console.log('add materials')  //test
            const moduleUpdate = await CourseModel.updateOne({ _id: module.courseId, 'modules._id': module._id }, { $set: { 'modules.$.materials': module.materials } })
            if (moduleUpdate?.modifiedCount > 0) {
                console.log("Updated Module =>", moduleUpdate)  //test
                return {
                    status: 200,
                    message: 'materials added successfully',
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to add materials',
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
            // console.log('edit course')  //test
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
            // console.log('block/unblock course')  //test
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

    async publishCourse(_id: ObjectId) {
        try {
            // console.log('course publish')  //test
            const statusChange = await CourseModel.updateOne({ _id }, { $set: { status: "Active" } })
            if (statusChange) {
                // console.log("Publish Status =>", statusChange)   //test
                return {
                    status: 200,
                    message: "Course Published",
                    data: statusChange,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to publish course',
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

    async sendApproval(_id: ObjectId) {
        try {
            // console.log('Sending Approval')  //test
            const statusChange = await CourseModel.updateOne({ _id }, { $set: { status: "Sent for approval" } })
            if (statusChange) {
                // console.log("Approval Status =>", statusChange)   //test
                return {
                    status: 200,
                    message: "Sent approval for activation",
                    data: statusChange,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to send approval',
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

    async RequestEdit(_id: ObjectId) {
        try {
            console.log('Sending Edit Request')  //test
            const statusChange = await CourseModel.updateOne({ _id }, { $set: { status: "Edit Requested" } })
            if (statusChange) {
                console.log("Edit Requested Status =>", statusChange)
                return {
                    status: 200,
                    message: "Sent Edit Request",
                    data: statusChange,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to send approval',
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

    async getAllCoursesForUser() {
        try { //for user
            console.log('listCourses User')  //test
            const draftCourses = await CourseModel.find().populate('branchId')
            const allCourses = draftCourses.filter((course) => course.status === 'Active')
            if (allCourses) {
                // console.log("Courses User =>", allCourses)  //test
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

    async getAllCourses() {
        try { //for admin
            // console.log('listCourses Admin')  //test
            const draftCourses = await CourseModel.find().populate('branchId')
            const allCourses = draftCourses.filter((course) => course.status !== 'draft')
            if (allCourses) {
                // console.log("Courses Admin =>", allCourses)  //test
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

    async listCoursesById(_id: ObjectId) {
        try {
            // console.log('Course Details')  //test
            const courseData = await CourseModel.findOne({ _id }).populate('branchId').populate('tutor')
            if (courseData) {
                // console.log("Courses =>", courseData)   //test 
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
                message: (error as Error).message
            }
        }
    }

    async listUsersByCourseId(_id: ObjectId) {
        try {
            const usersList = await enrollmentModel.findOne({ courseId: _id }).populate('users.userId')
            if (usersList) {
                console.log("UserList =>", usersList)   //test 
                return {
                    status: 200,
                    message: "Enrolled Users Details",
                    data: usersList,
                }
            } else {
                return {
                    status: 200,
                    message: 'No enrolled Users',
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }

    async listCoursesByTutor(tutorId: ObjectId) {
        try {
            // console.log('listCourses')  //test
            const allCourses = await CourseModel.find({ tutor: tutorId }).populate('branchId').populate('tutor')
            if (allCourses) {
                // console.log("Courses =>", allCourses)  //test
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

    async getBranches(role: string) {
        try {
            // console.log('listBranches')  //test
            const Branches = role === "user" ? await BranchModel.find({ isBlocked: false }) : await BranchModel.find()
            if (Branches) {
                // console.log("branches =>", Branches)  //test
                return {
                    status: 200,
                    message: "branches list",
                    data: Branches,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to fetch branches',
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

    async courseEnrollment(userId: ObjectId, courseId: ObjectId) {
        try {
            console.log('courseEnrollment')  //test
            const duplicateCheck = await this.enrollmentCheck(userId, courseId)
            console.log("duplicateCheck =>", duplicateCheck)
            if (duplicateCheck?.message === 'Enrolled for course') return {
                status: 400,
                message: 'Already enrolled for course',
            }

            const enrollment = await enrollmentModel.updateOne({ courseId }, { $addToSet: { users: { userId: userId, progress: 0 } } }, { upsert: true })
            console.log('courseEnrollment = >', enrollment)  //test
            if (enrollment?.modifiedCount > 0 || enrollment?.upsertedCount > 0) {
                return {
                    status: 200,
                    message: "enrollment list",
                    data: enrollment,
                }
            } else {
                return {
                    status: 400,
                    message: 'Failed to enroll for course',
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }

    async enrollmentCheck(userId: ObjectId, courseId: ObjectId) {
        try {
            console.log('courseEnrollmentCheck = >', courseId)  //test
            const isEnrolled = await enrollmentModel.findOne({ courseId, 'users.userId': userId });
            console.log("isEnrolled =>", isEnrolled)
            if (isEnrolled) return {
                status: 200,
                message: 'Enrolled for course',
                data: isEnrolled,
            }
            else {
                return {
                    status: 200,
                    message: 'Not enrolled for course',
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: (error as Error).message
            }
        }
    }

    async assessUserForCourse(userId: ObjectId, courseId: ObjectId, marks: number) {
        try {
            console.log('assessment = >', courseId, userId, marks)  //test
            const assessment = await enrollmentModel.updateOne({ courseId, 'users.userId': userId }, { $set: { 'users.$.marks': marks } });
            console.log("assessment =>", assessment)
            if (assessment) return {
                status: 200,
                message: 'Assessment completed',
                data: assessment,
            }
            else {
                return {
                    status: 200,
                    message: 'Unable to do Assessment',
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
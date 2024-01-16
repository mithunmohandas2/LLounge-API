import { ObjectId } from "mongoose";
import { Branch, Courses, Module } from "../domain/courses";
import courseRepository from "../infrastructure/repository/courseRepository";
import { ParsedQs } from "qs";

class courseUsecase {
    private courseRepository: courseRepository;
    constructor(courseRepository: courseRepository) {
        this.courseRepository = courseRepository
    }

    async createBranch({ branchName }: Branch) {
        if (!branchName) return {
            status: 400,
            message: 'Missing required fields',
        }
        //check for duplicates
        const isDuplicate = await this.courseRepository.findBranchByName(branchName)
        if (isDuplicate?.status === 200) return {
            status: 400,
            message: 'Branch name already exists'
        }
        const newBranch = await this.courseRepository.createBranch(branchName)
        return {
            status: newBranch?.status,
            data: newBranch?.data,
            message: newBranch?.message,
        }
    }

    async createCourse(course: Courses) {
        if (!course.courseName || !course.fee || !course.branchId) return {
            status: 400,
            message: 'Missing required fields',
        }
        //check for duplicates
        const isDuplicate = await this.courseRepository.findCourseByName(course.courseName)
        if (isDuplicate?.status === 200) return {
            status: 400,
            message: 'Course name already exists'
        }
        const newCourse = await this.courseRepository.createCourse(course)
        return {
            status: newCourse?.status,
            data: newCourse?.data,
            message: newCourse?.message,
        }
    }

    async editCourse(course: Courses) {
        console.log('inside edit course useCase')
        //check for duplicates
        const isValid = await this.courseRepository.findCourseById(course.courseId)
        if (isValid.status !== 200) return {
            status: 400,
            message: 'Course not found',
        }
        const editedCourse = await this.courseRepository.editCourse(course)
        return {
            status: editedCourse?.status,
            message: editedCourse?.message,
        }
    }

    async blockCourse(course: Courses) {
        // console.log('inside block course useCase') //test
        //check for duplicates
        const isValid = await this.courseRepository.findCourseById(course?.courseId)
        if (!isValid.data) return {
            status: 400,
            message: 'Course not found',
        }
        const Blocked = await this.courseRepository.blockCourse(course?.courseId, isValid?.data?.isBlocked)
        return {
            status: Blocked?.status,
            message: Blocked?.message,
        }
    }

    async publishCourse(course: Courses) {
        // console.log('inside publish course useCase') // test
        //check for duplicates
        const isValid = await this.courseRepository.findCourseById(course?.courseId)
        if (!isValid.data) return {
            status: 400,
            message: 'Course not found',
        }
        const isPublished = await this.courseRepository.publishCourse(course?.courseId)
        return {
            status: isPublished?.status,
            message: isPublished?.message,
        }
    }

    async requestApproval(course: Courses) {
        console.log('inside edit course useCase')
        //check for duplicates
        const isValid = await this.courseRepository.findCourseById(course?.courseId)
        if (!isValid.data) return {
            status: 400,
            message: 'Course not found',
        }
        const isChanged = await this.courseRepository.sendApproval(course?.courseId)
        return {
            status: isChanged?.status,
            message: isChanged?.message,
        }
    }

    async requestCourseEdit(course: Courses) {
        console.log('inside edit course useCase')
        //check for duplicates
        const isValid = await this.courseRepository.findCourseById(course?.courseId)
        if (!isValid.data) return {
            status: 400,
            message: 'Course not found',
        }
        const Blocked = await this.courseRepository.RequestEdit(course?.courseId)
        return {
            status: Blocked?.status,
            message: Blocked?.message,
        }
    }

    async addModule(module: Module) {
        if (!module?.courseId || !module?.modName || !module?.content || !module?.duration) return {
            status: 400,
            message: 'Missing required fields',
        }
        const isValid = await this.courseRepository.findCourseById(module.courseId)
        if (isValid.status !== 200) return {
            status: 400,
            message: 'Course not found',
        }
        const newModule = await this.courseRepository.addModule(module)
        return {
            status: newModule?.status,
            message: newModule?.message,
        }
    }

    async addMaterials(module: Module) {
        if (!module?.courseId || !module?.materials || !module?._id) return {
            status: 400,
            message: 'Missing required fields',
        }
        const isValid = await this.courseRepository.findCourseById(module.courseId)
        if (isValid.status !== 200) return {
            status: 400,
            message: 'Course not found',
        }
        const editModule = await this.courseRepository.addMaterials(module)
        return {
            status: editModule?.status,
            message: editModule?.message,
        }
    }

    async listCourses(query: ParsedQs) {
        // Check if query.tutorId exists and is a string
        if (query && query.tutorId && typeof query.tutorId === 'string') {
            const tutorId: ObjectId = query.tutorId as unknown as ObjectId; //string to ObjectID
            const courses = await this.courseRepository.listCoursesByTutor(tutorId)
            return {
                status: courses?.status,
                message: courses?.message,
                data: courses?.data,
            }
        } else if (query && query._id && typeof query._id === 'string') {
            const _id: ObjectId = query._id as unknown as ObjectId; //string to ObjectID
            const courses = await this.courseRepository.listCoursesById(_id)
            return {
                status: courses?.status,
                message: courses?.message,
                data: courses?.data,
            }
        } else {
            return {
                status: 400,
                message: "Invalid query received"
            }
        }

    }

    async listCoursesForUser() {
        const courses = await this.courseRepository.getAllCoursesForUser()
        return {
            status: courses?.status,
            message: courses?.message,
            data: courses?.data,
        }
    }

    async listAllCourses() {
        const courses = await this.courseRepository.getAllCourses()
        return {
            status: courses?.status,
            message: courses?.message,
            data: courses?.data,
        }
    }

    async listBranches(role: string) {
        const branchData = await this.courseRepository.getBranches(role)
        return {
            status: branchData?.status,
            message: branchData?.message,
            data: branchData?.data,
        }
    }

    async courseEnroll(data: { userId: string, courseId: string }) {
        const userId: ObjectId = data.userId as unknown as ObjectId; //string to ObjectID
        const courseId: ObjectId = data.courseId as unknown as ObjectId; //string to ObjectID

        const enrollData = await this.courseRepository.courseEnrollment(userId, courseId)
        return {
            status: enrollData?.status,
            message: enrollData?.message,
            data: enrollData?.data,
        }
    }

    async enrollCheck(data: { userId: string, courseId: string }) {

        const userId: ObjectId = data.userId as unknown as ObjectId; //string to ObjectID
        const courseId: ObjectId = data.courseId as unknown as ObjectId; //string to ObjectID

        const enrollData = await this.courseRepository.enrollmentCheck(userId, courseId)
        return {
            status: enrollData?.status,
            message: enrollData?.message,
            data: enrollData?.data,
        }
    }

}

export default courseUsecase
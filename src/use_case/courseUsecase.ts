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
        console.log('inside course useCase')
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
        console.log('inside course useCase')
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
        console.log('inside edit course useCase')
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

    async addModule(module: Module) {
        console.log('inside course useCase')
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

    async listCourses(query: ParsedQs) {
        console.log('inside course useCase')
        // Check if query.tutorId exists and is a string
        if (query && query.tutorId && typeof query.tutorId === 'string') {
            const tutorId: ObjectId = query.tutorId as unknown as ObjectId; //string to ObjectID
            const newModule = await this.courseRepository.listCoursesByTutor(tutorId)
            return {
                status: newModule?.status,
                message: newModule?.message,
                data: newModule?.data,
            }
        } else if(query && query._id && typeof query._id === 'string'){
            const _id: ObjectId = query._id as unknown as ObjectId; //string to ObjectID
            const newModule = await this.courseRepository.listCoursesById(_id)
            return {
                status: newModule?.status,
                message: newModule?.message,
                data: newModule?.data,
            }
        }else {
            return {
                status: 400,
                message: "Invalid query received"
            }
        }

    }

}

export default courseUsecase
import { Branch, Courses } from "../domain/courses";
import courseRepository from "../infrastructure/repository/courseRepository";

class courseUsecase {
    private courseRepository: courseRepository;
    constructor(courseRepository: courseRepository) {
        this.courseRepository = courseRepository
    }

    async createBranch({ branchName }: Branch) {
        console.log('inside course useCase')

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

        const isDuplicate = await this.courseRepository.findCourseByNameNBranch(course.courseName,course.branch)
        if (isDuplicate?.status === 200) return {
            status: 400,
            message: 'Branch name already exists'
        }
        const newBranch = await this.courseRepository.createBranch(course)
        return {
            status: newBranch?.status,
            data: newBranch?.data,
            message: newBranch?.message,
        }
    }

}

export default courseUsecase
import { Request, Response } from "express";
import courseUsecase from "../use_case/courseUsecase";

class courseController {
    private courseCase: courseUsecase
    constructor(courseCase: courseUsecase) {
        this.courseCase = courseCase
    }

    async createBranchControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const branch = await this.courseCase.createBranch(req.body)
            res.status(branch?.status).json(branch)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async createCourseControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const Course = await this.courseCase.createCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async editCourseControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const Course = await this.courseCase.editCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async blockCourseControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const Course = await this.courseCase.blockCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

     async addModuleControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const Course = await this.courseCase.addModule(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

     async listCoursesControl(req: Request, res: Response) {
        try {
            console.log('courseController')
            const Course = await this.courseCase.listCourses(req.query)
            console.log(Course)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }
 
}

export default courseController
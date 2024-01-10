import { Request, Response } from "express";
import courseUsecase from "../use_case/courseUsecase";

class courseController {
    private courseCase: courseUsecase
    constructor(courseCase: courseUsecase) {
        this.courseCase = courseCase
    }

    async createBranchControl(req: Request, res: Response) {
        try {
            const branch = await this.courseCase.createBranch(req.body)
            res.status(branch?.status).json(branch)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async createCourseControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.createCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async editCourseControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.editCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async blockCourseControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.blockCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async publishCourseControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.publishCourse(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async requestApprovalControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.requestApproval(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async requestCourseEditControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.requestCourseEdit(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async addModuleControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.addModule(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async addMaterialsControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.addMaterials(req.body)
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async listCoursesControl(req: Request, res: Response) {
        try {
            if (!req?.query?.tutorId && !req?.query?._id) {
                const Course = await this.courseCase.listCoursesForUser()
                // console.log(Course) //test
                res.status(Course?.status).json(Course)
            } else {
                const Course = await this.courseCase.listCourses(req.query)
                // console.log(Course) //test
                res.status(Course?.status).json(Course)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async listAllCoursesControl(req: Request, res: Response) {
        try {
            const Course = await this.courseCase.listAllCourses()
            // console.log(Course)  //test
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async listBranches(req: Request, res: Response, role: string) {
        try {
            const Course = await this.courseCase.listBranches(role)
            // console.log(Course)    //test
            res.status(Course?.status).json(Course)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }


}

export default courseController
import { Request, Response } from "express";
import adminUsecase from "../use_case/adminUsecase";

class adminController {
    private adminCase: adminUsecase
    constructor(adminCase: adminUsecase) {
        this.adminCase = adminCase
    }

    async listUserControl(req: Request, res: Response) {
        try {
            console.log('adminController')
            const user = await this.adminCase.listUsers(req.body)
            res.status(user.status).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async userBlockControl(req: Request, res: Response) {
        try {
            console.log('adminController')
            const user = await this.adminCase.blockUsers(req.body)
            res.status(user.status).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

    async createBranchControl(req: Request, res: Response) {
        try {
            console.log('adminController')
            const user = await this.adminCase.blockUsers(req.body)
            res.status(user.status).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    }

 
}

export default adminController
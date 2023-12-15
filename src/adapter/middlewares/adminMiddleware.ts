import { NextFunction, Request, Response } from "express";
import JWTService from "../../use_case/interface/jwtService";
const tokenService = new JWTService()


export const adminJwtAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log('jwtAuth')  //test
        const token = req.body.token || req.query.token || req.headers["authorization"];
        if (!token) return res.status(401).json({ message: 'Token misssing, Please login again' })
        const decode = await tokenService.verifyToken(token);
        // console.log("decoded", decode)  //test
        if (decode.status !== 200 || decode?.role !== 'admin') return res.status(401).json({ message: 'Unauthorized Access' })
        return next()   // token verify success

    } catch (error) {
        console.log((error as Error).message)
        return {
            status: 400,
            message: (error as Error).message,
        }
    }
}


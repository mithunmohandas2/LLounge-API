import adminController from "../../adapter/adminController";
import adminRepository from "../repository/adminRepository";
import adminUsecase from "../../use_case/adminUsecase";
import express from "express";
import { adminJwtAuth } from "../../adapter/middlewares/adminMiddleware";

const repository = new adminRepository()
const useCase = new adminUsecase(repository)
const controller = new adminController(useCase)

const router = express.Router()
//Test Server

router.post('/listUsers', adminJwtAuth, (req, res) => controller.listUserControl(req, res));
router.post('/blockUser',adminJwtAuth, (req, res) => controller.userBlockControl(req, res));

export default router
import adminController from "../../adapter/adminController";
import adminRepository from "../repository/adminRepository";
import adminUsecase from "../../use_case/adminUsecase";
import express from "express";
import { adminJwtAuth } from "../../adapter/middlewares/adminMiddleware";
import courseController from "../../adapter/courseController";
import courseUsecase from "../../use_case/courseUsecase";
import courseRepository from "../repository/courseRepository";

const repository = new adminRepository()
const useCase = new adminUsecase(repository)
const adminControl = new adminController(useCase)

const courseRepo = new courseRepository()
const courseCase = new courseUsecase(courseRepo)
const courseControl = new courseController(courseCase)

const router = express.Router()
//Test Server

router.post('/listUsers', adminJwtAuth, (req, res) => adminControl.listUserControl(req, res));
router.post('/blockUser',adminJwtAuth, (req, res) => adminControl.userBlockControl(req, res));
router.post('/createBranch',adminJwtAuth, (req, res) => courseControl.createBranchControl(req, res));
router.post('/createCourse',adminJwtAuth, (req, res) => courseControl.createCourseControl(req, res));

export default router
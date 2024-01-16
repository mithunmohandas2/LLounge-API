import userController from "../../adapter/userController";
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUsecase";
import express from "express";
import courseRepository from "../repository/courseRepository";
import courseUsecase from "../../use_case/courseUsecase";
import courseController from "../../adapter/courseController";

const repository = new userRepository()
const useCase = new Userusecase(repository)
const controller = new userController(useCase)
const courseRepo = new courseRepository()
const courseCase = new courseUsecase(courseRepo)
const courseControl = new courseController(courseCase)
const role = "user"

const router = express.Router()
//Test Server

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.signIn(req, res));
router.post('/sendOTP', (req, res) => controller.sendOTP(req, res));
router.post('/verifyOTP', (req, res) => controller.verifyOTP(req, res));
router.post('/tokenDecode', (req, res) => controller.tokenDecode(req, res));
router.post('/notifications', (req, res) => controller.createNotification(req, res));
router.get('/notifications', (req, res) => controller.getNotification(req, res));
router.get('/branches', (req, res) => courseControl.listBranches(req, res, role));
router.get('/courses', (req, res) => courseControl.listCoursesControl(req, res));
router.get('/branches', (req, res) => courseControl.listBranches(req, res, role));
router.post('/course/enroll', (req, res) => courseControl.courseEnrollControl(req, res));
router.post('/course/enrollCheck', (req, res) => courseControl.enrollCheckControl(req, res));

export default router
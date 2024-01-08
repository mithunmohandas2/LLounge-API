import express from "express";
import courseController from "../../adapter/courseController";
import courseUsecase from "../../use_case/courseUsecase";
import courseRepository from "../repository/courseRepository";
import { tutorJwtAuth } from "../../adapter/middlewares/tutorMiddleware";

const courseRepo = new courseRepository()
const courseCase = new courseUsecase(courseRepo)
const courseControl = new courseController(courseCase)

const router = express.Router()
//Test Server

router.post('/createCourse',tutorJwtAuth, (req, res) => courseControl.createCourseControl(req, res));
router.put('/editCourse',tutorJwtAuth, (req, res) => courseControl.editCourseControl(req, res));
router.put('/blockCourse',tutorJwtAuth, (req, res) => courseControl.blockCourseControl(req, res));
router.put('/addModule',tutorJwtAuth, (req, res) => courseControl.addModuleControl(req, res));
router.put('/addMaterials',tutorJwtAuth, (req, res) => courseControl.addMaterialsControl(req, res));
router.get('/courses',tutorJwtAuth, (req, res) => courseControl.listCoursesControl(req, res));

export default router
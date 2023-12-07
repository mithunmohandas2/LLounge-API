import userController from "../../adapter/userController";
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUsecase";
import express from "express";

const repository = new userRepository()
const useCase = new Userusecase(repository)
const controller = new userController(useCase)

const router = express.Router()
//Test Server

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.signIn(req, res));
router.post('/sendOTP', (req, res) => controller.sendOTP(req, res));
router.post('/verifyOTP', (req, res) => controller.verifyOTP(req, res));

export default router
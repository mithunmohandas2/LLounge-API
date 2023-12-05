import userController from "../../adapter/userController";
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUsecase";
import express from "express";

const repository = new userRepository()
const useCase = new Userusecase(repository)
const controller = new userController(useCase)

const router = express.Router()
//Test Server
router.get('/', (req, res) => res.status(200).json({ message: 'API running successfully' }))
router.post('/api/user/register', (req, res) => controller.register(req, res))
router.post('/api/user/login', (req, res) => controller.signIn(req, res))

export default router
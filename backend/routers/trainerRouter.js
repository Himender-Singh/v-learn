import express from 'express'
import { deleteTrainer, getAllTrainer, getSingleTrainer, getTrainerProfile, updateTrainer } from '../controllers/trainer.controller.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import reviewRouter from './reviewRouter.js'

const trainerRouter = express.Router()

trainerRouter.use("/:trainerId/reviews",reviewRouter)

trainerRouter.get('/:id',getSingleTrainer)
trainerRouter.get('/',getAllTrainer)
trainerRouter.put('/:id',authenticate,restrict(["trainer"])  ,updateTrainer)
trainerRouter.delete('/:id',authenticate,restrict(["trainer"]) ,deleteTrainer)
trainerRouter.get('/profile/me',authenticate,restrict(["trainer"]) ,getTrainerProfile)

export default trainerRouter
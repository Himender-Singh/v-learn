import express from 'express';
import { 
  deleteUser, 
  getAllUser, 
  getMyAppointments, // Fixed typo 
  getSingleUser, 
  getUserProfile, 
  updateUser 
} from '../controllers/user.controller.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const userRouter = express.Router();

// Specific routes first
userRouter.get('/profile/me', authenticate, restrict(['trainee']), getUserProfile);
userRouter.get('/appointments/my-appointments', authenticate, restrict(['trainee']), getMyAppointments);

// Parameterized routes after specific routes
userRouter.get('/:id', authenticate, restrict(['trainee']), getSingleUser);
userRouter.get('/', authenticate, restrict(['admin']), getAllUser);
userRouter.put('/:id', authenticate, restrict(['trainee']), updateUser);
userRouter.delete('/:id', authenticate, restrict(['trainee']), deleteUser);

export default userRouter;

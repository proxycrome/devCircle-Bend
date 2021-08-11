import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authValidator from "../middleware/AuthValidator.js";
import { cloudinaryConfig } from '../config/cloudinaryConfig.js';
import { multerUploads } from "../config/multerConfig.js";


const router = Router();
 
router.route('/').get(UserController.getUsers);
router.route('/:userId').put(authValidator, multerUploads.single('image'), cloudinaryConfig, UserController.updateUser).get(UserController.getUserById);

export default router;
import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authValidator from "../middleware/AuthValidator.js";


const router = Router();
 
router.route('/').get(UserController.getUsers);
router.route('/:userId').put(authValidator, UserController.updateUser).get(UserController.getUserById);


export default router;
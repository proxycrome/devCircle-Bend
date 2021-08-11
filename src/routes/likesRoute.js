import express from 'express'
import { getUsers, getPostsUserLiked, addLikeByUser, deleteLikeByUser, getLikesOnAllUsers, getLikesOnUser } from '../controllers/likesController.js';


const router = express.Router(); 

router
.route('/usersFromPostgres')
.get(getUsers)
// .post(addUser) //used to manually add users to postgres. not needed


// router  TO DO
// .route('/users/:id')
// .post(addUsers) //add get one user

router
.route('/users/LikesOnAllUsers')
.get(getLikesOnAllUsers)

router
.route('/users/likesOnUser/:id')
.get(getLikesOnUser)

router
.route('/users/:fromUserId/likes-from-user')
.get(getPostsUserLiked)
.post(addLikeByUser)
.delete(deleteLikeByUser)







export default router;
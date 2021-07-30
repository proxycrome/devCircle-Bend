import express from 'express';
import {getChat} from '../controllers/messageController.js'


const router = express.Router();
router
.route('users/:senderId/getAllChatHistory')
.get(getChat.allChat);

router
.route('users/:senderId/getChat/:receiverId')
.get(getChat.currentChat);




import app from './server.js';
import socketio from 'socket.io';
import http from 'http';
import {userJoin, userLeave} from './utils/users.js';
import pkg from 'pg';


const {Pool} = pkg;

export const pool = new Pool();

const server = http.createServer(app);
const io = socketio(server);


io.on("connection", (socket) =>{
    console.log("New user connected");
    //save user and socket id
    socket.on("openChat", ({userName, userId}) => {
        userJoin(socket.id, userName, userId);
    })

    socket.on("sendMessage", (data) => {
       const {sender, receiver, message, time, read} = data;
        const socketId = getUserSocket(data.receiver); //to socket
        if(socketId){
            io.to(socketId).emit("newMessage", data);  
        }
        try {
            let result = await pool.query('INSERT into messages (sender, receiver, message, time, read) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sender, receiver, message, time, read]);
        } catch(e){
                console.log(e);
        }
    })



 
    
    socket.on("disconnected", (userId) => {
        userLeave(userId)
    })
})
import pkg from 'pg';
import dotenv from "dotenv";
import {registeredUser, loggedInUser} from "./AuthController.js"


const {Pool} = pkg;


dotenv.config();


export const pool = new Pool();


export const getUsers = async (req, res) => {
    try{
        let result = await pool.query('SELECT * FROM users');
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            users: result.rows
        
        })
    } catch(e){
        console.log(e);
    }
} 

// export const addUser = async (req, res) => {
//     const {userId, userName} = req.body;
//     try{
//         let result = await pool.query('INSERT into users (user_id, user_name) VALUES ($1, $2) RETURNING *', [userId, userName]);
//         console.log(result)
//         res.status(200).json({
//             status: "success",
//             result: result.rows.length,
//             users: result.rows
        
//         })
//     } catch(e){
//         console.log(e);
//     }
// } 

export const getPostsUserLiked = async (req, res) => {
    const fromUserId = req.params.fromUserId
    try{
        let result = await pool.query('SELECT * FROM likes WHERE fromuser_id = $1', [fromUserId])
        console.log(result)
        res.status(200).json({
            status: "success",
            resultLength: result.rows.length,
            posts: result.rows
            
        })
    } catch(e){
        console.log(e)
    }
}
export const addLikeByUser = async (req, res) => {
    console.log(req.params, req.body);
    const fromUserId = registeredUser || loggedInUser; 
    console.log("registeredUser" + registeredUser)                                                    //add like by current logged in user
    console.log("loggedInUser" + loggedInUser)                                                    //add like by current logged in user
    console.log("fromUserid" + fromUserId)                                                    //add like by current logged in user
    const toUserId = req.body.toUserId
    
    try{
        let result = await pool.query('INSERT into likes (fromuser_id, touser_id) VALUES ($1, $2) RETURNING *', [fromUserId, toUserId]);
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            like: result.rows
        })
    } catch(e){
        console.log(e)
    }
}
export const deleteLikeByUser = async (req, res) => {
    const fromUserId = registeredUser|| loggedInUser; 
    console.log("registeredUser" + registeredUser)                                                    //add like by current logged in user
    console.log("loggedInUser" + loggedInUser)                                                    //add like by current logged in user
    console.log("fromUserid" + fromUserId)    //delete like by current logged in user
    const toUserId = +req.body.toUserId;
    try{
        let result = await pool.query('DELETE FROM likes WHERE fromuser_id = $1 AND touser_id = $2', [fromUserId, toUserId]);
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            like: result.rows
        })
    } catch(e){
        console.log(e)
    }
}
export const getLikesOnAllUsers = async (req, res) => {
   
    try{
        let result = await pool.query('SELECT * FROM likes ORDER BY id')
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            likes: result.rows
        })
    } catch(e){
        console.log(e)
    }
}
export const getLikesOnUser = async (req, res) => {
    const toUserId = req.params.id;
    try{
        let result = await pool.query('SELECT * FROM likes WHERE touser_id = $1', [toUserId])
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            likes: result.rows
        })
    } catch(e){
        console.log(e)
    }
}


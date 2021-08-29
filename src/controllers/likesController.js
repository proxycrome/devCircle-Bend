import client from "../database/linkesIndex.js";
import dotenv from "dotenv";




dotenv.config();





export const getUsers = async (req, res) => {
    try{
        let result = await client.query('SELECT * FROM users');
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            users: result.rows
        
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err});
    }
} 

// export const addUser = async (req, res) => {
//     const {userId, userName} = req.body;
//     try{
//         let result = await client.query('INSERT into users (user_id, user_name) VALUES ($1, $2) RETURNING *', [userId, userName]);
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
        let result = await client.query('SELECT * FROM likes WHERE from_user_id = $1', [fromUserId])
        console.log(result)
        res.status(200).json({
            status: "success",
            resultLength: result.rows.length,
            posts: result.rows
            
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err});
    }
}


export const addLikeByUser = async (req, res) => {
    const {toUserId} = req.body
    const {fromUserId} = req.params
    
    try{
        let result = await client.query('INSERT into likes (from_user_id, to_user_id) VALUES ($1, $2) RETURNING *', [fromUserId, toUserId]);
        console.log(result.rows)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            like: result.rows
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err})
    }
}


export const deleteLikeByUser = async (req, res) => {
    const {toUserId} = req.body
    const {fromUserId} = req.params
    try{
        let result = await client.query('DELETE FROM likes WHERE from_user_id = $1 AND to_user_id = $2', [fromUserId, toUserId]);
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            data: result.rows
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err})
    }
}


export const getLikesOnAllUsers = async (req, res) => {
   
    try{
        let result = await client.query('SELECT * FROM likes ORDER BY id')
        console.log(result)
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            data: result.rows
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err})
    }
}

export const getLikesOnUser = async (req, res) => {
    const toUserId = req.params.id;
    try{
        let result = await client.query('SELECT * FROM likes WHERE to_user_id = $1', [toUserId])
        console.log(result)
        res.status(200).json({
            status: "success",
            likesCount: result.rows.length,
            likes: result.rows
        })
    } catch(err){
        res.status(500).json({status: "fail", message: 'server error', err})
    }
}


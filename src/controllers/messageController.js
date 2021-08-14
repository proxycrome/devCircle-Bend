import pkg from 'pg';
import dotenv from "dotenv";

const {Pool} = pkg;
dotenv.config();


export const pool = new Pool();


const getChat = {
    allChat: async(req, res) => {
        //query all chats for user
    },

    currentChat: async(req, res) => {
        
    }
}


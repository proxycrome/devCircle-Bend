import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/UserModel.js';


dotenv.config();



const AuthController = {
    signUp: async (req, res) => {
        console.log("entered block")
        try {
        
            const { firstName, lastName, email, password, github, gender } = req.body; 
            

            if( !firstName || !lastName || !email || !password || !github || !gender) {
                return res.status(400).json({status: 'fail', message: "Please fill all fields"})
            }
           
        

            // Check if the email already exists

            const emailExists = await User.findOne({email})

            if(emailExists) {
                return res.status(400).json({status: 'fail', message: "User already exist"});
            }
            


            //password hash 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
             
            

            if(hashedPassword){
                const newUser = new User({ firstName, lastName, email, password: hashedPassword, github, gender })
                const savedUser = await newUser.save();
            
                console.log("4")
                if(savedUser) {
                    jwt.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                        if(err) {
                            throw err;
                        }
                        res.status(200).json({status: "success", data: {
                            token: 'Bearer ' + token,
                            id: savedUser._id,
                            firstName: savedUser.firstName,
                            lastName: savedUser.lastName,
                            email: savedUser.email,
                            github: savedUser.github,
                            gender: savedUser.gender
                        }, message: "successful"});
                    }); 
                } 
                //If user is saved add user id to postgres database users table
                // try {
                // let result = await pool.query('INSERT into users (user_id, user_name) VALUES ($1, $2) RETURNING *', [savedUser._id, savedUser.name]);
                // } catch(e){
                //     console.log(e);
                // }   
            }
        } catch(error){
            res.status(500).json({status: "fail", message: "server err", error});
        }
    },

    login:  async(req, res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(400).json({status: 'fail', message: "Provide email and password"});
            }

        const isUser = await User.findOne({email});

            if(!isUser) {
                res.status(404).json({status: 'fail', message: "record not found"})
            }

            // validate user password

            const match = await bcrypt.compare(password, isUser.password);
            
            if(!match) {
                return res.status(400).json({status: 'fail', message: "email or password is incorrect"});
            }
            
            jwt.sign({id: isUser._id}, process.env.JWT_SECRET,{expiresIn: 86400}, (err, token) => {
                    
                if(err) {
                throw err;
                }
        
                return res.status(200).json({status: "success", data: {
                    token: "Bearer " + token,
                    id: isUser._id,
                    firstName: isUser.firstName,
                    lastName: isUser.lastName,
                    email: isUser.email,
                    github: isUser.github,
                    gender: isUser.gender
                }, message: "successful"});
            });
        } catch (err) {
            res.status(500).json({status: 'failed', message: "Server Error", err})
        }
    },

}

export default AuthController;
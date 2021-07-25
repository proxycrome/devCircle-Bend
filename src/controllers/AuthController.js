import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/UserModel.js';



dotenv.config();

const AuthController = {
    signUp: async (req, res) => {
        const { name, email, password, github, facebook, linkedIn, bio } = req.body;

        if(!name || !email || !password || !github) {
            return res.status(400).json({status: 'fail', message: "Please fill all fields"})
        }

        // Check if the email already exists

        const emailExists = await User.findOne({email})

        if(emailExists) {
            return res.status(400).json({status: 'fail', message: "User already exist"})
        }


        //password hash 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if(hashedPassword){
            const newUser = new User({name, email, password: hashedPassword, github, facebook, linkedIn, bio})
            const savedUser = await newUser.save();
            
            if(savedUser) {
                jwt.sign({id:savedUser._id}, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                    if(err) {
                        throw err;
                    }
                
                    res.status(200).json({status: "success", data: {
                        token: 'Bearer ' + token,
                        id: savedUser._id,
                        name: savedUser.name,
                        email: savedUser.email,
                        github: savedUser.github,
                        facebook: savedUser.facebook,
                        linkedIn: savedUser.linkedIn,
                        bio: savedUser.bio
                    }, message: "successful"});
                }); 
            }
        }
    },

    login:  async(req, res) => {
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
                name: isUser.name,
                email: isUser.email,
                github: isUser.github,
                facebook: isUser.facebook,
                linkedIn: isUser.linkedIn,
                bio: isUser.bio
            }, message: "successful"});
        });
    },

}

export default AuthController;
 import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config()

const authValidator = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ status: 'failed', message: 'unauthorized' });
        }
        
        let bearerToken = token.split(' ')[1];
        
        await jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decode) => {
            if(err){
                return res
                .status(500)
                .json({ status: false, message: 'failed to authenicate token.'});
            }
            next();
                
        });
    }catch(err){
        console.log(err);
        return res.status(401).json({
            status: 'failed',
            message: 'unauthorized'
        });
    }
}

export default authValidator;
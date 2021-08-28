import { User } from "../models/UserModel.js";
import { uploader } from "../config/cloudinaryConfig.js";
import { datauri } from "../config/multerConfig.js";


const UserController = {
    getUsers: async (req, res) => {
        let PAGESIZE = 20;
        let page = 1;
        let skip

        if(req.query.page){
            page = +req.query.page;
            skip = (page - 1) * PAGESIZE;
        }
        try{
            const users = await User.find({}).lean().exec();
            const docCount = await User.find({}).countDocuments();
            return res
                .status(201)
                .json({
                    status: 'success', 
                    message: 'successful', 
                    data: users,
                    documentCount: docCount,
                    totalPages: Math.ceil(docCount/PAGESIZE),
                    nextPage: Math.ceil(docCount/PAGESIZE) > page ? `/${page + 1}`: null
                })
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }    
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;
        
        try{
            const user = await User.findById(userId).lean().exec();
            return res.status(201).json({status: 'success', message: 'successful', data: user})
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err})
        }
        
    },

    updateUser: async (req, res) => {
        const file = datauri(req);
        const result = await uploader.upload(file.content,
           {
                dpr: "auto", 
                responsive: true, 
                width: "auto", 
                crop: "scale"
           });
        const { bio, facebook, linkedIn } = req.body;
        const {userId} = req.params;

        try{
            const newInputs = await User.findByIdAndUpdate(userId, { bio, facebook, linkedIn, img_url: result.secure_url }, {new: true});
            const inputs = await newInputs.save();
            if(!inputs) {
                return res.status(400).json({status: 'fail', message: 'something went wrong'});
            }
            return res.status(201).json({status: 'success', message: 'successful', data: inputs});
        }catch(err){
            return res.status(500).json({status: 'fail', message: 'server error', err});
        }
    },

}

export default UserController;
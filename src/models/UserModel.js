import mongoose from 'mongoose';
import validator from 'validator'

const {Schema, model} = mongoose;
const { isEmail } = validator;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a vaild email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    github: {
        type: String,
        required: [true, 'Please enter a link to your github account']
    },
    facebook: {
        type: String
    },
    linkedIn: {
        type: String
    },
    img_url: {
        type: String
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
        required: true
    }
}, 
{timestamps: true}
);

export const User = model('user', userSchema);
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password)
        {
            return next(errorHandler(400,"Please fill all the credentials"));
        }
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return next(errorHandler(400,"User already exists"));
        }
        let hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({username,email,password:hashedPassword});
        return res.status(200).json({
            success:true,
            message:"User created successfully"
        })        
    }
    catch(error){
        next(error);
    }
}

export const signin=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return next(errorHandler(400,"Please fill all the credentials"));
        }
        let existingUser=await User.findOne({email});
        if(!existingUser)
        {
            return next(errorHandler(400,"User doesn't exist"));
        }
        let verifyPassword=await bcrypt.compare(password,existingUser.password);
        if(!verifyPassword)
        {
            return next(errorHandler(400,"Wrong Password"));
        }
        const payload={
            id:existingUser._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly: true
        }
        existingUser=existingUser.toObject();
        existingUser.token=token;
        existingUser.password=undefined;
        
        return res.cookie('access_token', token, options).status(200).json({
            success:true,
            existingUser,
            message:"User logged in successfully"
        });      
    }
    catch(error){
        next(error);
    }
}

export const google = async (req, res, next) => {
    try 
    {
        let existingUser = await User.findOne({email: req.body.email});
        if(existingUser){
            const payload={
                id:existingUser._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true
            }
            existingUser=existingUser.toObject();
            existingUser.token=token;
            existingUser.password=undefined;
            
            return res.cookie('access_token', token, options).status(200).json({
                success:true,
                existingUser,
                message:"User logged in successfully"
            });
        } 
        else {
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            //Converts the random number to a base-36 string representation, i.e it uses the digits 0-9 and letters a-z to represent the number.
            //Uses the last 8 characters of the generated string.
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            let existingUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase()+Math.random().toString(36).slice(-4), //username is unique
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await existingUser.save();

            const payload={
                id:existingUser._id
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true
            }
            existingUser=existingUser.toObject();
            existingUser.token=token;
            existingUser.password=undefined;
            
            return res.cookie('access_token', token, options).status(200).json({
                success:true,
                existingUser,
                message:"User logged in successfully"
            });
        }
    } 
    catch (error) {
        next(error);
    }
  };
  
export const signOut = async (req, res, next) => {
    try 
    {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out successfully');
    } 
    catch (error) {
        next(error);
    }
};
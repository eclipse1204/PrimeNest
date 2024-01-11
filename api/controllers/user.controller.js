import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const updateUser = async (req, res, next) => {
  try {
    //Authorization
    //comparing ids, first obtained from the cookies i.e logged in user and second obtained from the url i.e user at frontend
    if (req.user.id !== req.params.id){
      return next(errorHandler(400, 'User is trying to update the data of other user.'));
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,
      {
        $set: {
          //if value is empty then we do not change that value in db
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },{ new: true }
    ); // returns updated document
    updatedUser.password=undefined;
    res.status(200).json({
      success:true,
      updatedUser,
      message:"User data updated successfully"
    })  
  } 
  catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id){
      return next(errorHandler(400, 'User is trying to delete the account of other user.'));
    }

    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json({
        success:true,
        message:'User has been deleted successfully'
      }
    );
  } 
  catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id){
      return next(errorHandler(400, 'User is trying to get the listings of other user.'));
    }
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } 
  catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }
    user.password=undefined;
    res.status(200).json(user);
  } 
  catch (error) {
    next(error);
  }
};

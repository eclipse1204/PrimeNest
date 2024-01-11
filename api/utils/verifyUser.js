import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

//Authentication - User is logged in or not
export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(400, 'Unauthorized'));
  }

  try{
    const user=jwt.verify(token, process.env.JWT_SECRET); //decryption
    req.user=user;
  }
  catch(error){
    return next(errorHandler(400, 'Forbidden'));
  }
  next();
};

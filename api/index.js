import express from 'express';
import {dbConnect} from './config/database.js';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.route.js';

const app=express();
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
 
app.use((err, req, res, next) => {   //middleware for error handling
  // calling next allows to pass control to the next middleware in the stack. If you want to terminate the middleware chain within this error handling middleware, you can omit it.
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  
dbConnect();
import express from 'express';
import dbConnect from './config/database.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';
const app=express();

const __dirname = path.resolve();

app.listen(3000,()=>{
    console.log("App is running on port 3000");
})

app.use(express.json()); // json parser
app.use(cookieParser()); // cookie parser

app.use('/api/user',userRouter); //mounting
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


//middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});

dbConnect();
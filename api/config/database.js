import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((error)=>{
        console.log("ERROR in DB connection");
        console.log(error);
        process.exit(1);
    })
}

export default dbConnect;
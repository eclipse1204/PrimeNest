import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connected Successfully")})
    .catch((error)=>{
        console.log("Error in DB connection");
        console.error(error.message);
        process.exit(1);
    })
}

export {dbConnect};
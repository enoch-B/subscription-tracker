import mongoose, { mongo } from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if(!MONGODB_URI){
    throw new Error('Please define the MONGODB_URI environment vairable inside .env');
}

const connectToDatabase = async ()=>{
    try{

        await mongoose.connect(MONGODB_URI);
        console.log(`Database Connected in ${NODE_ENV} mode`);
    }
    catch(error){
     console.error('Error Connecting to database', error)

     process.exit(1)
    }
}

export default connectToDatabase;
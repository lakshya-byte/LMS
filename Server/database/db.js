import mongoose, { connect } from "mongoose";

export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB)
        console.log('database connected');
        
    } catch (error) {
     console.log(error);
     
        
    }

}
import mongoose from 'mongoose';
import 'dotenv/config';
export const connectDB = async () => {
    try {
        //await mongoose.connect('mongodb://localhost:27017/drones');
        const url = process.env.DB_CONNECTION_STRING;
        await mongoose.connect(url+'/drones');
        console.log("Base de datos conectados")
    } catch (error) {
        console.error(error);
    }
};
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/drones');
        console.log("Base de datos conectados")
    } catch (error) {
        console.error(error);
    }
};
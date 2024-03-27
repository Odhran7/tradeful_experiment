// This is the config for the database

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from "./logger.js";

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoURI);
        logger.info('MongoDB connected...');
    } catch (err) {
        logger.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        logger.info('MongoDB disconnected...');
    } catch (err) {
        logger.error('Error disconnecting from MongoDB:', err.message);
        process.exit(1);
    }
};

export {
    connectDB,
    disconnectDB,
};
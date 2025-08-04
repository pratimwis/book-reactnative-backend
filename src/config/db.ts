import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const { MONGODB_URI } = process.env;
import logger from "../utils/logger";
const connectToDatabase = async (): Promise<void> => {
    if (!MONGODB_URI) {
        logger.error("MongoDB connection URI is missing.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        logger.info("Successfully connected to the database");
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Database connection error: ${error.message}`);
        } else {
            logger.error("An unknown error occurred during database connection.");
        }
        process.exit(1); // Exit the process with failure
    }
};

export default connectToDatabase;
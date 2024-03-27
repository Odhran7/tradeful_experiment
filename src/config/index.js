import { connectDB, disconnectDB } from "./database.js";
import swaggerDocs from "./swagger.js";
import logger from "./logger.js";
import limiter from "./limiter.js";

const config = {
    connectDB,
    disconnectDB,
    swaggerDocs,
    logger,
    limiter,
};

export default config;
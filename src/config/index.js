import { connectDB, disconnectDB } from "./database.js";
import swaggerDocs from "./swagger.js";
import logger from "./logger.js";
import limiter from "./limiter.js";
import auth0Config from "./auth0.js";

const config = {
    connectDB,
    disconnectDB,
    swaggerDocs,
    logger,
    limiter,
    auth0Config,
};

export default config;
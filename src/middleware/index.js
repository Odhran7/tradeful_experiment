import errorMiddleware from "./errorMiddleware.js";
import validateApiKey from "./apiKeyAuth.js";

const middleware = {
    errorMiddleware,
    validateApiKey
};

export default middleware;
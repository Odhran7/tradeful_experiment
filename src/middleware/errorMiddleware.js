// Error handling middleware

import config from '../config/index.js';

const errorMiddleware = (err, req, res, next) => {
    config.logger.error(err.stack);

    res.status(500).send({
        error: 'Internal Server Error',
        message: err.message,
    });
};

export default errorMiddleware;
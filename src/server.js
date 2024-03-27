import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import middleware from './middleware/index.js';
import swaggerUi from 'swagger-ui-express';
import config from './config/index.js';


// Load env 

dotenv.config();

// Init app

const app = express();

// Init DB

if (process.env.NODE_ENV !== 'test') {
    config.connectDB();
}

// Middleware 

app.use(cors());
app.use(express.json());
app.use(config.limiter);
app.use(express.urlencoded({ extended: true }));
app.use(middleware.errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config.swaggerDocs));

// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the Tradeful API (Experiment)')
})

// Starting the server

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        config.logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

export default app;
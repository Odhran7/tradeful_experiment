import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import middleware from './middleware/index.js';
import swaggerUi from 'swagger-ui-express';
import config from './config/index.js';
import UserRoutes from './routes/user/index.js';
import { connectDB } from './config/database.js';

// Load env 

dotenv.config();

// Init app

const app = express();

// Middleware 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(config.limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config.swaggerDocs));

// Routes

const userRoutes = new UserRoutes(express.Router());

app.get('/', (req, res) => {
    res.send('Welcome to the Tradeful API (Experiment)')
})

app.use('/api', userRoutes.getRoutes());
app.use(middleware.errorMiddleware);
// For handling 404 errors
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
  });

// Starting the server

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            config.logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    })
}

export default app;
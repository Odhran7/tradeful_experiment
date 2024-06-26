import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import middleware from './middleware/index.js';
import swaggerUi from 'swagger-ui-express';
import config from './config/index.js';
import UserRoutes from './routes/user/index.js';
import { connectDB } from './config/database.js';
import basicAuth from 'express-basic-auth';

// Load env 
dotenv.config();

// Init app
const app = express();

// Middleware 
app.set('trust proxy', 1);

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'https://dev-0nxzl9co.eu.auth0.com', 'https://tradeful.pro', 'https://tradeful-experimental-client.vercel.app', 'https://tradeful.ie', 'https://www.tradeful.ie', 'https://api.prod.tradeful.ie'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(config.limiter);

// Auth for api-docs
app.use('/api-docs', basicAuth({
    users: { 'admin': process.env.API_DOCS_PASSWORD },
    challenge: true,
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config.swaggerDocs));

app.get('/', (req, res) => {
  res.send('Welcome to the Tradeful API - We coonnect homeowners with tradespoeple')
})

// API Key for all the rest of the routes
app.use(middleware.validateApiKey);

// Routes
const userRoutes = new UserRoutes(express.Router());

app.use('/api', userRoutes.getRoutes());
app.use(middleware.errorMiddleware);

// For handling 404 errors
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
  });

// Starting the server
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            config.logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    })
}

export default app;
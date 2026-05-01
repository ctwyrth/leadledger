import express from 'express';

import healthRoutes from './routes/healthRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

// create and configure the Express server
const app = express();

// register middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// establish health route
app.use('/health', healthRoutes);

// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK' });
// });

// register error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
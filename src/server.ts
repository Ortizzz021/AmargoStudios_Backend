import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import routes from './interface/routes';
import { errorHandler } from './interface/middleware/errorHandler';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Recurso no encontrado',
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || '3001';

app.listen(PORT, () => {
  console.log(`🚀 Amargo Studios Backend server running on port ${PORT} in ${env.NODE_ENV} mode`);
});

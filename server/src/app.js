const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { connectToDatabase } = require('./config/database');
const subtitleRoutes = require('./routes/subtitleRoutes');
const dialogRoutes = require('./routes/dialogRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiRouter = express.Router();

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(requestLogger);
app.use('/api/v1', apiRouter);

// Swagger UI
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

apiRouter.use('/subtitles', subtitleRoutes);
apiRouter.use('/dialogs', dialogRoutes);

// Catch-all route for undefined routes
app.use('/api/v1/*', (req, res, next) => {
  const error = new Error('Resource/Route Not Found');
  error.status = 404;
  next(error);
});

app.use(errorHandler);

// Export the Express app
module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
  async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api/v1/api-docs`);
    });
  }

  startServer();
}
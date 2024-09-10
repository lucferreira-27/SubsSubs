const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { connectToDatabase } = require('./config/database');
const subtitleRoutes = require('./routes/subtitleRoutes');
const dialogRoutes = require('./routes/dialogRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/subtitles', subtitleRoutes);
app.use('/dialogs', dialogRoutes);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).end();
  } else {
    const error = new Error('Resource/Route Not Found');
    error.status = 404;
    next(error);
  }
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
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  }

  startServer();
}
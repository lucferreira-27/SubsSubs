const { app, connectToDatabase } = require('./app');

const startServer = async () => {
  await connectToDatabase();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
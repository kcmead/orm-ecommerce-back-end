// Import necessary modules
const express = require('express');
const routes = require('./routes');
// Import sequelize connection
const sequelize = require('./config/connection');

// Create an Express application
const app = express();

// Define the port, using the environment variable PORT or defaulting to 3001
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the defined routes
app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

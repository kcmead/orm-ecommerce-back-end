const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending off Sequelize's Model class
class Tag extends Model {}

// Set up fields and rules for Tag model
Tag.init(
  {
    // Define columns for the Tag model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Configure the model options
    sequelize, // Connect to the database using the sequelize instance
    timestamps: false, // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true, // Use the model's name as the table name without pluralizing
    underscored: true, // Use underscores instead of camelCase for automatically added attributes
    modelName: 'tag', // Define the model name in singular form
  }
);

// Export the Tag model for use in other files
module.exports = Tag;
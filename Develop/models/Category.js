
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Define the Category model by extending Sequelize's Model class
class Category extends Model {}

// Initialize the Category model with column definitions
Category.init(
  {
    // Define columns for the Category model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Configure the model options
    sequelize, // Connect to the database using the sequelize instance
    timestamps: false, // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true, // Use the model's name as the table name without pluralizing
    underscored: true, // Use underscores instead of camelCase for automatically added attributes
    modelName: 'category', // Define the model name in singular form
  }
);

// Export the Category model for use in other files
module.exports = Category;
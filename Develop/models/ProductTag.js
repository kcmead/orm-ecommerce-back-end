const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}

// Set up fields and rules for ProductTag model
ProductTag.init(
  {
    // Define columns for the ProductTag model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // References the `Product` model's `id`.
        key: 'id',
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag', // References the `Tag` model's `id`.
        key: 'id',
      },
    },
  },
  {
    // Configure the model options
    sequelize, // Connect to the database using the sequelize instance
    timestamps: false, // Disable timestamps (createdAt, updatedAt) for this model
    freezeTableName: true, // Use the model's name as the table name without pluralizing
    underscored: true, // Use underscores instead of camelCase for automatically added attributes
    modelName: 'product_tag', // Define the model name in singular form
  }
);

// Export the ProductTag model for use in other files
module.exports = ProductTag;
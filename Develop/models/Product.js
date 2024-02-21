// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for Product model
Product.init(
  {
    // Define columns for the Product model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      // References the `Category` model's `id`.
      references: {
        model: 'category',
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
    modelName: 'product', // Define the model name in singular form
  }
);

// Export the Product model for use in other files
module.exports = Product;
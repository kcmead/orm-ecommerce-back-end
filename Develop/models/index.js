// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations between models

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id' // Define foreign key column for the association
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Define foreign key column for the association
  onDelete: 'CASCADE', // Set up cascading delete for associated Products when a Category is deleted
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Specify the join table for the association
  as: 'productTag_products', // Define alias for the association
  foreignKey: 'product_id' // Define foreign key column for the association in the join table
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Specify the join table for the association
  as: 'productTag_products', // Define alias for the association
  foreignKey: 'tag_id' // Define foreign key column for the association in the join table
});

// Export all models for use in other files
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
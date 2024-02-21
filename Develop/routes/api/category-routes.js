const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// GET a specific category by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    // Find a category by ID and include associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      // Handle not found error
      res.status(404).json({ message: 'No Category found with this ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle client error
    res.status(400).json(err);
  }
});

// PUT (update) a category by its ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category by ID
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    // Handle client error
    console.log(err);
    res.status(400).json(err);
  }
});

// DELETE a category by its ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by ID
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

module.exports = router;
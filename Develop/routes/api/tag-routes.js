const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags with associated Product data
router.get('/', async (req, res) => {
  try {
    // Find all tags, including associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'productTag_products' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// GET one tag by ID with associated Product data
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its ID, including associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'productTag_products' }],
    });
    if (!tagData) {
      // Handle not found error
      res.status(400).json({ message: 'No Product found with this id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    // Handle client error
    res.status(400).json(err);
  }
});

// PUT (update) a tag's name by ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // Respond with updated tag data
      res.status(200).json(tag);
    })
    .catch((err) => {
      // Handle errors during the update process
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete one tag by its ID
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      // Handle not found error
      res.status(404).json({ message: 'No Category found with that ID' });
      return;
    }
    // Respond with deleted tag data
    res.status(200).json(tagData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

module.exports = router;
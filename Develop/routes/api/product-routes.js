const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    // Find all products, including associated Category and Tag data
    const productData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, attributes: ['tag_name'], through: ProductTag, as: 'productTag_products' }
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// GET one product by ID with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its ID, including associated Category and Tag data
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, attributes: ['tag_name'], through: ProductTag, as: 'productTag_products' }
      ],
    });

    if (!productData) {
      // Handle not found error
      res.status(400).json({ message: 'No Product found with this id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

// POST a new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // Check if there are product tags to create pairings in the ProductTag model
      if (req.body.tagIds.length) {
        // Create an array of productTag objects for bulk creation
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        // Bulk create productTag pairs
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond with the created product
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // Handle errors during the creation process
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT (update) product by ID
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions in parallel
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // Handle errors during the update process
      //console.log(err);
      //res.status(400).json(err);
      res.json(err);
    });
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete one product by its ID
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!productData) {
      // Handle not found error
      res.status(404).json({ message: 'No Product found with that ID' });
      return;
    }
    // Respond with the deleted product data
    res.status(200).json(productData);
  } catch (err) {
    // Handle server error
    res.status(500).json(err);
  }
});

module.exports = router;
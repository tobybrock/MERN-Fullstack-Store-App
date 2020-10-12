const router = require("express").Router();
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require('../../auth');

router.get('/', async (req, res) => {
try {
    const products = await Product.find({});
    res.send(products);
}catch(err){
    res.status(400).json('No products found', err)
}
});

router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: 'Product Not Found.' });
  }
});

// router.post('/:id/reviews', isAuth, async (req, res) => {
//     const review = {
//         name: req.body.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       };
//       try{
//     const product = await Product.findById(req.params.id);
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce((a, c) => c.rating + a, 0) /
//       product.reviews.length;
//     const updatedProduct = await product.save();
//     res.status(201).send({
//       data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       message: 'Review saved successfully.',
//     });
//   } catch(err) {
//     res.status(404).json('Product not found', err);
//   }
// });

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(201).json("Product successfully updated", product)
    } catch(err){
   res.status(500).json(' Error in Updating Product.', err);
    }
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.json({ message: 'Product Deleted' });
  } else {
    res.json('Error in Deletion.');
  }
});

router.post('/', async (req, res) => {
  try{
  const product = await Product.create(req.body);
   res.status(201).json({ message: 'New product created', data: product });
  } catch(err){
  return res.status(500).json({error: err.message });
  }
});

module.exports = router;
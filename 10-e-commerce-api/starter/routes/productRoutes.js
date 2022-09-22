const express = require('express');
const router = express.Router();
const { authorizePermissions } = require('../middleware/authentication')

const {
    createProduct, 
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(authorizePermissions('admin') ,createProduct);
router.route('/:id').get(getSingleProduct).patch(authorizePermissions('admin'), updateProduct).delete(authorizePermissions('admin'), deleteProduct)
router.route('/uploadImage').post(authorizePermissions('admin'), uploadImage);

module.exports = router;
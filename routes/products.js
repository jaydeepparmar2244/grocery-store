const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const {isLoggedIn,isAuthor,validateProduct} = require('../middleware');
const products = require('../controllers/products');
const users = require('../controllers/users');
const multer = require('multer');
const {storage} = require('../cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn,upload.array('image'),validateProduct,catchAsync(products.addProduct));

router.get('/new',isLoggedIn,products.newForm);

router.route('/:id')
    .get(catchAsync(products.showProduct))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateProduct,catchAsync(products.updateProduct))
    .delete(isLoggedIn,isAuthor,catchAsync(products.deleteProduct));

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(products.editForm));

module.exports = router;
const express = require('express');
// const app = express();
const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
// const {reviewSchema,camprgroundSchema} = require('../schemas');
// const Review = require('../models/review');
// const Product = require('../models/product');
const router = express.Router({mergeParams:true});
// const Joi = require('joi');
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');


router.post('/',validateReview,isLoggedIn,catchAsync(reviews.reviewProduct));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));

module.exports = router;
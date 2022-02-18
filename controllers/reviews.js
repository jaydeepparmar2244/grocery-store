const Review = require('../models/review');
const Product = require('../models/product');

module.exports.reviewProduct = async function(req,res){
    const product = await Product.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success','Succefully Reviewed!');
    res.redirect(`/products/${product._id}`);
};

module.exports.deleteReview = async function(req,res){
    const {id,reviewId} = req.params;
    await Product.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Succefully Deleted Review!');
    res.redirect(`/products/${id}`);
};
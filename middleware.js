const ExpressError = require('./utils/ExpressError');
const {productSchema, reviewSchema} = require('./schemas');
const Product = require('./models/product');
const Joi = require('joi');
const Review = require('./models/review');


module.exports.isLoggedIn = function(req,res,next){
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You Must Be Signed In First!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProduct = function(req,res,next){
    const productSchema = Joi.object({
        product:Joi.object({
            name: Joi.string().required(),
            brand: Joi.string(),
            category: Joi.string().required(),
            price: Joi.number().min(0).required(),
            amount: Joi.string().required(),
            // image:Joi.string(),
        }),
        deleteImages: Joi.array()
    })
    const {error} = productSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}

module.exports.isAuthor = async function(req,res,next){
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!');
        return res.redirect(`/products/${id}`)
    }
    next();
}

module.exports.isReviewAuthor = async function(req,res,next){
    const { id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!');
        return res.redirect(`/products/${id}`)
    }
    next();
}

module.exports.validateReview = function(req,res,next){
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    else{
        next();
    }
}


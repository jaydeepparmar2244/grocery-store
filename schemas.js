const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body:Joi.string().required()
    }).required()
}) 

module.exports.productSchema = Joi.object({
        product:Joi.object({
            name: Joi.string().required(),
            brand: Joi.string().required(),
            category: Joi.string().required(),
            price: Joi.number().min(1).required(),
            amount: Joi.string().required(),
            // image:Joi.string().required(),
        }).required(),
        deleteImages: Joi.array()
    })
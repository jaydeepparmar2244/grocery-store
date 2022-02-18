const Product = require('../models/product');
const { cloudinary } = require("../cloudinary");

module.exports.index = async function(req,res){
    const products = await Product.find({});
    res.render('products/index',{products});
}

module.exports.newForm = function(req,res){
    // const {id} = req.params;
    res.render('products/new');
    // ,{id}
}

module.exports.addProduct = async function(req,res,next){
    const product = new Product(req.body.product);
    product.images = req.files.map(f=> ({ url: f.path, filename: f.filename }));
    product.author = req.user._id;
    await product.save();
    console.log(product);
    req.flash('success','Succefully Created!');
    res.redirect(`products/${product._id}`);
}

module.exports.showProduct = async function(req,res,next){
    const product = await Product.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!product){
        req.flash('error','Product Not Found!');
        return res.redirect('/products')
    }
    res.render('products/show',{product});
}

module.exports.editForm = async function(req,res,next){
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        req.flash('error','Product Not Found!');
        return res.redirect('/products')
    }
    res.render('products/edit',{product});
};

module.exports.updateProduct = async function(req,res){
    const {id} = req.params;
    console.log(req.body);
    const product = await Product.findByIdAndUpdate(id,{...req.body.product},{runValidators:true});
    const imgs = req.files.map(f=> ({ url:f.path, filename: f.filename }));
    product.images.push(...imgs);
    await product.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await product.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success','Succefully Updated!')
    res.redirect(`/products/${product._id}`);
};

module.exports.deleteProduct = async function(req,res){
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success','Succefully Deleted!')
    res.redirect('/products')
};
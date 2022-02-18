const mongoose = require('mongoose');
const {Schema} = mongoose;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        default:'Local',
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    images:[ImageSchema],
    // image:{
    //     type:String
    // },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:'Review'
    }
    ]
})

productSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})


module.exports = mongoose.model('Product',productSchema);
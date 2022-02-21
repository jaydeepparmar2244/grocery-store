const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true, useUnifiedTopology: true})
.then(function(){
    console.log("Mongoose Connection Open!");
})
.catch(function(err){
    console.log("Mongoose Connection Failed, Error!");
    console.log(err);
})


// const p = new Product({
//     name:'Cucumber',
//     brand:'Local',
//     price:20,
//     category:'vegetable',
//     amount:'100 gram',
//     image:'eer'
// })

// p.save()
// .then(function(data){
//     console.log(data);
// })
// .catch(function(e){
//     console.log(e);
// })

const seedProducts = [
    {
        name:'Apple',
        brand:'Kashmiri',
        price:100,
        category:'Fruit',
        amount:'500 Gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1634054299/Groceries/fewwefeq110wdayo2vc6.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'6213391249f3376740a7c64d'
    },
    {
        name:'FaceWash',
        brand:'Himalaya',
        price:120,
        category:'Health Care',
        amount:'250 gram',
        images:[
            {
            url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1633868280/Groceries/ma0z7grw4p04n8hcb6mo.webp", 
            filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
        }
        ],
        author:'6213391249f3376740a7c64d'
    },
    {
        name:'Tomato',
        brand:'Local',
        price:40,
        category:'Vegetable',
        amount:'250 gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1633868279/Groceries/bm8wjmauqetektpumk9o.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'6213391249f3376740a7c64d'
    },
    {
        name:'Noodles',
        brand:'Maggy',
        price:12,
        category:'Snack',
        amount:'20 gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1633867519/Groceries/m86v4o0n3arzgh2sh8ls.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'6213391249f3376740a7c64d'
    }
]

Product.insertMany(seedProducts)
.then(function(data){
    console.log(data);
})
.catch(function(e){
    console.log(e);
})
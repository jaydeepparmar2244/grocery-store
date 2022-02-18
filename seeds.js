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
        name:'Buttermilk',
        brand:'Amul',
        price:10,
        category:'Dairy',
        amount:'200 gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1625386638/Yelpcamp/vsxjpnjvumky9miqhjkr.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'60d457f099e67539b0c2ea3c'
    },
    {
        name:'Apples',
        brand:'Local',
        price:100,
        category:'Fruit',
        amount:'250 gram',
        images:[
            {
            url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1625386638/Yelpcamp/vsxjpnjvumky9miqhjkr.jpg", 
            filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
        }
        ],
        author:'60d457f099e67539b0c2ea3c'
    },
    {
        name:'Carrot',
        brand:'Local',
        price:20,
        category:'Vegetable',
        amount:'50 gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1625386638/Yelpcamp/vsxjpnjvumky9miqhjkr.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'60d457f099e67539b0c2ea3c'
    },
    {
        name:'Waffers',
        brand:'Real',
        price:10,
        category:'Snack',
        amount:'20 gram',
        images:[
            {
                url: "https://res.cloudinary.com/dgm2ycrlq/image/upload/v1625386638/Yelpcamp/vsxjpnjvumky9miqhjkr.jpg", 
                filename: "Yelpcamp/vsxjpnjvumky9miqhjkr" 
            }
        ],
        author:'60d457f099e67539b0c2ea3c'
    }
]

Product.insertMany(seedProducts)
.then(function(data){
    console.log(data);
})
.catch(function(e){
    console.log(e);
})
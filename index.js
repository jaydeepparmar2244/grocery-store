if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const sessionConfig = {
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews')

mongoose.connect('mongodb://localhost:27017/store', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:false})
.then(function(){
    console.log("Mongoose Connection Open!");
})
.catch(function(err){
    console.log("Mongoose Connection Failed, Error!");
    console.log(err);
})


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));
app.use('/',userRoutes);
app.use('/products',productRoutes);
app.use('/products/:id/reviews', reviewRoutes)


app.get('/',function(req,res){
    // res.send('Hellooo!');
    res.render('products/index')
})

app.all('*',function(req,res,next){
    next(new ExpressError('Page Not Found!',404))
    res.send('404')
})

app.use(function(err,req,res,next){
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Somethingggg Wrong Here!';
    res.status(statusCode).render('error',{err});
})


app.listen(3000,function(){
    console.log('Listening on 3000 Port!');
})
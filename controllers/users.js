const User = require('../models/user');

module.exports.registerForm = function (req, res) {
    res.render('users/register')
};

module.exports.register = async function (req, res) {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, function (err) {
            if (err) return next(err);
            req.flash('success', 'Welcome!');
            res.redirect('/products');
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }

};

module.exports.showProfile = function (req, res) {
    res.render('users/profile');
}

module.exports.loginForm = function (req, res) {
    res.render('users/login');
};

module.exports.login = function (req, res) {
    req.flash('success', 'Welcome!');
    const redirectUrl = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = function (req, res) {
    req.logout();
    req.flash('success', 'Logged Out!!')
    res.redirect('/products');
};
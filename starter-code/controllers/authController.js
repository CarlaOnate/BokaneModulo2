const User = require('../models/User')
const passport = require('../config/passport')

exports.signupView = (req, res) => {
    res.render('auth/auth')
}

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userOnDB = await User.findOne({ email })

    if (userOnDB !== null) {
      return res.render("auth/auth", { msg: "The email is already registered, please log in" })
    }
    let user = await User.register({ name, email }, password)

    passport.authenticate("local", { //se llama a si misma porque es un middleware.
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next)

}

exports.loginView = async (req, res) => {
   res.render("auth/auth", { msg: req.flash("error") });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}
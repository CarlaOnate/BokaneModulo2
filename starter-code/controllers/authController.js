const User = require('../models/User')

exports.signupView = (req, res) => {
    res.render('auth/auth')
}

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    const userOnDB = await User.findOne({ email })

    if (userOnDB !== null) {
      res.render("auth/auth", { msg: "El correo ya fue registrado" })
    }
    await User.register({ name, email }, password)
    res.redirect("/")
}

exports.loginView = (req, res) => {
    res.render("auth/auth", { msg: req.flash("error") });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
}
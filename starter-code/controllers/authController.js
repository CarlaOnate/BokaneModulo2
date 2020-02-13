const User = require('../models/User')
const passport = require('../config/passport')

exports.signupView = (req, res) => {
    res.render('auth/auth')
}

exports.signup = async (req, res, next) => {
    const { firstName, lastName,confirmPassword, email, password } = req.body;
    const userOnDB = await User.findOne({ email })
    var name=`${firstName} ${lastName}`;
  //Checa si ya existe el usuario
    if (userOnDB !== null) {
      return res.render("auth/auth", { msg: "The email is already registered, please log in" })
    }

    //Checa si la contraseña tiene al menos 8 digitos
  if(password.length<8){
    return res.render("auth/auth", { msg: 'Your password need at less 8 digits' })
  }
 // Checa si la contraseña y su confirmacion son identicas
 if(password!==confirmPassword){
    return res.render("auth/auth", { msg: 'The passwords dont match' })
  }
   //Si todo esta OK, registramos un nuevo usuraio
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
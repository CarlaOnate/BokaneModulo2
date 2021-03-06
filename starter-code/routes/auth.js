const router = require('express').Router()
const passport = require('../config/passport')
const {signupView, signup, loginView, logout} = require('../controllers/authController')

router.get('/signup', signupView)
router.post('/signup', signup)

router.get('/login', loginView)

router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true
    })
)

router.get(
    "/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
)

router.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/auth/login"
    })
)

router.get('/logout', logout)

module.exports = router
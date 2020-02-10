const express = require('express');
const router  = express.Router();
const {profileView, campingView} = require('../controllers')
const {isAuthenticated} = require('../middleware')

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', isAuthenticated, profileView)

router.get('/camping', campingView)

module.exports = router;

const express = require('express');
const router  = express.Router();
const {profileView} = require('../controllers')
const {isAuthenticated} = require('../middleware')

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', isAuthenticated, profileView)

module.exports = router;

const express = require('express');
const router  = express.Router();
const {profileView, campingView, actView} = require('../controllers')
const {isAuthenticated} = require('../middleware')

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', isAuthenticated, profileView)

router.get('/camping', campingView)
router.get('/activities', actView)

module.exports = router;

const express = require('express');
const router  = express.Router();
const {profileView, campingView, actView} = require('../controllers')
const {isAuthenticated} = require('../middleware')

router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) return res.render('index', {show:false, profile:true});
  res.render('index', {show:false, profile:false});
});

router.get('/profile', isAuthenticated, profileView)

router.get('/camping', campingView)
router.get('/activities', actView)

module.exports = router;

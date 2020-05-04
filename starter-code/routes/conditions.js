const express = require('express');
const router  = express.Router();
const {termsView} = require('../controllers')


router.get('/conditions', termsView)

module.exports = router;

const router = require('express').Router()
const {suscribeView} = require('../controllers/suscribe.controller')

router.post('/', suscribeView)

module.exports = router

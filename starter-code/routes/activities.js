let router = require('express').Router()
let {activity, actGetformView} = require('../controllers/activities.controller')
// let {actView} = require('../controllers/')

router.post('/activities/:activity/:id_user', activity) //RUTA PRIVADA

module.exports = router
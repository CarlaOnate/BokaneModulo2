let router = require('express').Router()
let {activity, actGetformView} = require('../controllers/activities.controller')


router.post('/activities/:activity/:id_user', activity) //RUTA PRIVADA
// router.put('', editAct)

module.exports = router
let router = require('express').Router()
let {activity, editView, edit} = require('../controllers/activities.controller')
let {isAuthenticated} = require('../middleware')


router.post('/:activity/:id_user', activity) //RUTA PRIVADA se hace en controllers
router.get('/:id_act', isAuthenticated, editView) //RUTA PRIVADA
router.put('/:id_act', isAuthenticated, edit) //RUTA PRIVADA


module.exports = router
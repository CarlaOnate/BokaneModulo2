let router = require('express').Router()
let {activity, editView, edit, deleteAct} = require('../controllers/activities.controller')
let {isAuthenticated} = require('../middleware')


router.post('/:activity/:id_user', activity) //RUTA PRIVADA se hace en controllers
router.get('/:id_act', isAuthenticated, editView) //RUTA PRIVADA
router.post('/:id_act', isAuthenticated, edit) //RUTA PRIVADA

router.get('/delete/:id_act', isAuthenticated, deleteAct) //RUTA PRIVADA

module.exports = router
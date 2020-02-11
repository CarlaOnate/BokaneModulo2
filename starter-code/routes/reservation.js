

const router = require('express').Router()
//const router=require('../routes')
const {reserView,reserPost,reserCheckView,reserCheckPost,reserBookView,reserBookPost} = require('../controllers/reserControllers.js')

router.get('/', reserView)
router.post('/', reserPost)
router.get('/check',reserCheckView)
router.post('/check',reserCheckPost)
router.get('/book',reserBookView)
router.post('/book',reserBookPost)

module.exports = router



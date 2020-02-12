const router = require('express').Router()
let {isAuthenticated} = require('../middleware')
const {reserView,
  reserPost,
  reserCheckView,
  reserCheckPost,
  reserBookView,
  reserBookPost,
  reserCompView,
  reserCompPost,
  editBookView,
  editBookPost,
  deleteBook} = require('../controllers/reserControllers.js')

router.get('/', reserView)
router.post('/', reserPost)
router.get('/check',reserCheckView)
router.post('/check',reserCheckPost)
router.get('/book',reserBookView)
router.post('/book',reserBookPost)
router.get('/book-complete/:id',reserCompView)
router.post('/book-complete/:id',reserCompPost)

router.get('/edit/:id', isAuthenticated, editBookView) //RUTA PRIVADA
router.post('/edit/:id', isAuthenticated, editBookPost) //RUTA PRIVADA
router.get('/delete/:id', isAuthenticated, deleteBook) //RUTA PRIVADA

module.exports = router



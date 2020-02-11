let router = require('express').Router()
let uploadCloud = require('../config/cloudinary')
let {editProfile, editProfileView, deleteProfile} = require('../controllers/UDprofile.controller')
let {isAuthenticated} = require('../middleware')


router.get('/profile-picture', isAuthenticated, editProfileView)
router.post('/profile-picture', isAuthenticated, uploadCloud.single('profilePic'), editProfile)
router.get('/profile/del/:id_user', isAuthenticated, deleteProfile)


module.exports = router
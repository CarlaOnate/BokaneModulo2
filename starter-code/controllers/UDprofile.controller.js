const User = require('../models/User')

exports.editProfile = async (req, res) => {
  let userId = req.user._id
  let { name, email } = req.body
  if(req.file){
    let {secure_url} = req.file
    let user = await User.findByIdAndUpdate(userId, {name, email, image: secure_url})
    req.user = user
    return res.redirect('/profile')
  }
  let user = await User.findByIdAndUpdate(userId, {name, email})
  req.user = user
  res.redirect('/profile')
}

exports.editProfileView = async (req, res) => {
  if(req.user.role === 'ADMIN'){
    let actAll = await Activity.find().populate('user_id')
    let activities = await Activity.find().populate('user_id')
    let reservations = await Reservation.find().populate('user_id')
    let user = await User.findById(req.user._id)
    res.render('profile', {activities, reservations, user, show:false, profile:true, admin:true})
  } else {
  let activities = await Activity.find({user_id: req.user._id})
  let reservations = await Reservation.find({user_id: req.user._id})
  let user = await User.findById(req.user._id)
  res.render('edit-profile', {user,  show:false, profile:true})
}
}

exports.deleteProfile = async (req, res) => {
  let {id_user} = req.params
  await User.findByIdAndDelete(id_user)
  res.redirect('/')
}

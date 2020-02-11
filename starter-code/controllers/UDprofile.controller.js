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
  let user = await User.findById(req.user._id)
  res.render('edit-profile', user)
}

exports.deleteProfile = async (req, res) => {
  let {id_user} = req.params
  await User.findByIdAndDelete(id_user)
  res.redirect('/')
}

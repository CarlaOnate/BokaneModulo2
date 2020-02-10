const User = require('../models/User')
const Activity = require('../models/Activity')


exports.activity = async (req, res) => {
  if(req.isAuthenticated()){
    let {activity, id_user} = req.params
    let {numberPeople, time} = req.body
    let user = await User.findOne({_id: id_user})
    let newAct = await Activity.create({
      name: user.name,
      user_id: id_user,
      numPeople: numberPeople,
      typeAct: activity,
      time: time
    })
    await user.activities.push(newAct._id)
    await user.save()
    res.redirect('/profile')
  } else {
    res.render('activities', {showError: true})
  }
}

exports.editView = async (req, res) => {
  let act = await Activity.findById(req.params.id_act)
  res.render('editAct', act)
}


exports.edit = async (req, res) => {
  let{typeAct, time, numberPeople} = req.body
  let act = await Activity.findByIdAndUpdate(req.params.id_act, {numPeople: numberPeople, typeAct, time })
  res.redirect('/profile')
  // res.redirect(304, '/profile')
}

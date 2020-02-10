const User = require('../models/User')
const Activity = require('../models/Activity')
let {isAuthenticated} = require('../middleware/index')


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
    user.save()
    res.redirect('/profile')
  } else {
    res.render('activities', {showError: true})
  }
}


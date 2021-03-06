const User = require('../models/User')
const Activity = require('../models/Activity')


exports.activity = async (req, res) => {
  if(req.isAuthenticated()){
    let {activity, id_user} = req.params
    let {numberPeople, time} = req.body
    let user = await User.findOne({_id: id_user})
    //Comparamos valor de activity para guardar su img correspondiente
let img='';
switch (activity){
case 'kayak':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561491/BOKANE/act3_e3ncjf.webp'
  break;
case 'climbing':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561491/BOKANE/act1_czpcs1.webp'
  break;
case 'waterski':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561491/BOKANE/act2_v0g6zl.webp'
  break;
}
    let newAct = await Activity.create({
      name: user.name,
      user_id: id_user,
      numPeople: numberPeople,
      typeAct: activity,
      time: time,
      img:img
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
  res.render('editAct',  {act, show:false, profile:true })
}


exports.edit = async (req, res) => {
  let{typeAct, time, numberPeople} = req.body
  let act = await Activity.findByIdAndUpdate(req.params.id_act, {numPeople: numberPeople, typeAct, time })
  res.redirect('/profile')
}

exports.deleteAct = async (req, res) => {
  let {id_act} = req.params
  await Activity.findByIdAndDelete(id_act)
  res.redirect('/profile')
}

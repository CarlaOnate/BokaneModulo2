const User = require('../models/User')
const Activity = require('../models/Activity')
const Reservation = require('../models/Reservation')

exports.profileView = async (req, res) => {
    let activities = await Activity.find({user_id: req.user._id})
    let reservations=await Reservation.find({user_id: req.user._id})
    let user = await User.findById(req.user._id)
    res.render('profile', {activities, reservations,user, show:false, profile:true})
}

exports.campingView = (req, res) => {
    res.render('camping')
}

exports.actView = (req, res) => {
    if(req.isAuthenticated()){
        let {name, _id} = req.user
        res.render('activities', {name, _id, show:false, profile:true})
    } else {
        res.render('activities', {showError: true,  show:false, profile:false})
    }
}

exports.aboutUsView = (req, res) => {
    if(req.isAuthenticated()) return res.render('about-us', {  show:false, profile:true })
    res.render('about-us', {  show:false, profile:false })
}
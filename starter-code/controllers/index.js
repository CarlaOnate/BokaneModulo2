
exports.profileView = (req, res) => {
    res.render('profile')
}

exports.campingView = (req, res) => {
    res.render('camping')
}

exports.actView = (req, res) => {
    if(req.isAuthenticated()){
        let {name, _id} = req.user
        res.render('activities', {name, _id})
    } else {
        res.render('activities', {showError: true})
    }
}
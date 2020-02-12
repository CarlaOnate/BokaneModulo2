
exports.suscribeView = (req, res) => {
  if (req.isAuthenticated()) return res.render('index', {msg: 'El correo fue registrado exitosamente',   show:true, profile:true})
  res.render('index', {msg: 'El correo fue registrado exitosamente', show:true, profile:false})
}
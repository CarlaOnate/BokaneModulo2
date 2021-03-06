const User = require('../models/User')
const Reservation = require('../models/Reservation')
const passport = require('../config/passport')

//---------------------------------------------------------------------------------------------------

exports.reserView=(req,res,next)=>{
  if(req.isAuthenticated()) return res.render('reservations/select', {show:false, profile:true})
res.render('reservations/select', {show:false, profile:false})
}

//--------------------------------------------------------------------------------------------------------

exports.reserPost=(req,res,next)=>{
  const {startDate,endDate,numAdults,numChildren,checkRoom1,checkRoom2,checkRoom3}=req.body
  //Calculamos el día del año 0-365 de fecha inicial y fecha del dia
  let diff = new Date(startDate)-new Date(new Date(startDate).getFullYear(), 0, 0);
  let day = Math.floor(diff/86400000);
  const dayYearSD=day+1;
   diff = new Date()-new Date(new Date().getFullYear(), 0, 0);
   day = Math.floor(diff/86400000);
  const dayYearTod=day;
  //calcula numero de días entre las dos fechas
  const today=new Date().getTime();
  const minSD=new Date(startDate).getTime();
  const minED=new Date(endDate).getTime();
  let days=minED-minSD;
  days/=(1000 * 3600 * 24);
  //Obtenemos valores de adultos y niños
  const adults=Number(numAdults)
  const children=Number(numChildren)
  //Obtenemos valores de input checkbox
  let validate=0;
  let numValidate=0;
  if(checkRoom1==='on'){
  validate=1;
  numValidate++;
  }
  if(checkRoom2==='on'){
  validate=2;
  numValidate++;
  }
  if(checkRoom3==='on'){
  validate=3;
  numValidate++;
  }
//Checamos si la primer fecha es al menos la fecha del día presente
if(dayYearSD<dayYearTod){
  msg='You need select at less today in start day'
  res.render("reservations/select",{msg})
  return;
}

//Checamos si la diferencia de dias es al menos de uno
if(days<=0){
  msg='You need select at less one night'
  res.render("reservations/select",{msg})
  return;
}
//Checamos que se seleccione solo un elemento de las habitaciones disponibles
if(numValidate!=1){
  msg='You need check one room'
  res.render("reservations/select",{msg})
  return;
}
 else{
  res.redirect(`/reservation/check?days=${days}&a=${adults}&c=${children}&op=${validate}&sd=${minSD}&ed=${minED}`)
 }
}


//---------------------------------------------------------------------------------------------------

exports.reserCheckView=(req,res,next)=>{
  const {days,a,c,op,sd,ed}=req.query
  const perNigth=500;
  const perTotal=perNigth*days;
  let img='';
switch (op){
case '1':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room1_rctil8.webp'
  break;
case '2':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room2_tbrfc6.webp'
  break;
case '3':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561494/BOKANE/room3_oddrac.webp'
  break;
}
  //-----------------------------------------------------------opijohiogiyfcccuiyfviuonpoopnnpiuiv
  const obj={
    days:days,
    perNigth:perNigth,
    perTotal:perTotal,
    adults:a,
    children:c,
    room:op,
    startDate:sd,
    endDate:ed,
    img:img
  }
 if(req.isAuthenticated()) return res.render('reservations/check',{obj, show:false, profile:true})
res.render('reservations/check',{obj, show:false, profile:false})
}

//---------------------------------------------------------------------------------------------------

exports.reserCheckPost=(req,res,next)=>{
  const {days,adults,children,room,perTotal,startDate,endDate}=req.body
  const numHide=999*Number(perTotal) //Se multiplica para que que pase desapercibido en la url como un dato mas.
  res.redirect(`/reservation/book?days=${days}&a=${adults}&c=${children}&op=${room}&nor=${numHide}&sd=${startDate}&ed=${endDate}`)
}

//---------------------------------------------------------------------------------------------------

exports.reserBookView=(req,res,next)=>{
  const {days,a,c,op,nor,sd,ed}=req.query
  const obj={
    days:days,
    adults:a,
    children:c,
    room:op,
    startDate:sd,
    endDate:ed,
    perTotal:nor/999
  }
  if(req.isAuthenticated()){
  res.render('reservations/bookAuth',{obj, show:false, profile:true})
  }else{
res.render('reservations/book',{obj, show:false, profile:false})
  }
}

//---------------------------------------------------------------------------------------------------

exports.reserBookPost= async(req,res,next)=>{
  const {days,adults,children,room,startDate,endDate,perTotal,checkConditions}=req.body
  const obj={
    days:days,
    adults:adults,
    children:children,
    room:room,
    startDate:startDate,
    endDate:endDate,
    perTotal:perTotal
  }

//Solo se ejecutara este codigo si no hay usuarios logeados
  if(!req.isAuthenticated()){
  //Busca el nuevo usuraio
  var { firstName, lastName, email, password, confirmPassword} = req.body;
  var name=`${firstName} ${lastName}`;
  var userOnDB = await User.findOne({ email })
  //Checa si ya existe el usuario
  if (userOnDB !== null) {
    obj.msg='The email is already registered'
    res.render("reservations/book",obj)
    return;
  }

  //Checa si la contraseña tiene al menos 8 digitos
  if(password.length<8){
    obj.msg='Your password need at less 8 digits'
    res.render("reservations/book",obj)
    return;
  }
 // Checa si la contraseña y su confirmacion son identicas
  if(password!==confirmPassword){
    obj.msg='The passwords dont match'
    res.render("reservations/book",obj)
    return;
  }
  }


   //Checa si el checkbox de terminos y condiciones esta activado
   if(checkConditions!=='on'){
    obj.msg='You need acept Terms and Conditions'
    if(!req.isAuthenticated()){
    res.render("reservations/book",obj)
    }
    else{
    res.render("reservations/bookAuth",obj)
    }
    return;
   }
  else{

    //Si todo esta OK, registramos un nuevo usuraio
    if(!req.isAuthenticated()){
    await User.register({ name, email }, password)
    var user=await User.findOne({ email })
    console.log(`nuevo= ${user}`)
    }else{
      console.log(`autenticado= ${req.user}`)
      user=req.user;
      //const {email}=req.user;
      //var user=await User.findOne({email})
    }
  
let nameRoom='';
let img='';
switch (room){
case '1':
  nameRoom='Carla Room'
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room1_rctil8.webp'
  break;
case '2':
  nameRoom='Dova Room'
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room2_tbrfc6.webp'
  break;
case '3':
  nameRoom='Avenu Place'
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561494/BOKANE/room3_oddrac.webp'
  break;
}
//Define Fecha con hora de Entrada y Salida
const startDateS=Number(startDate)+(3600000*19);
const endDateS=Number(endDate)+(3600000*19);
  const newRes={
    user_id: user._id,
    startDate:new Date(startDateS).toLocaleString(),
    endDate:new Date(endDateS).toLocaleString(),
    numDays:days,
    totalPrice:perTotal,
    numAdult:adults,
    numChild:children,
    room:nameRoom,
    img:img,
  }
  //Creamos una nueva reservacion ligada al usuario
  const reser=await Reservation.create(newRes);
  const id=reser._id
  await user.reservations.push(id)
  await user.save()
/*
  passport.authenticate("local", { //se llama a si misma porque es un middleware.
    successRedirect: "/reservation/book-complete/${id}",
    failureRedirect: "/auth/login",
    failureFlash: true
})(req, res, next)
*/

  res.redirect(`/reservation/book-complete/${id}`)
  }
}

//--------------------------------------------------------------------------------------------------

exports.reserCompView=(req,res,next)=>{
  const {digitalPayCheck}=req.body
  const {id}=req.params;
  const obj={
    digitalPayCheck,
    id
  }
  if(req.isAuthenticated()){
    res.render('reservations/complete',{obj, show:false, profile:true})
    }else{
  res.render('reservations/complete',{obj, show:false, profile:false})
    }
}

//---------------------------------------------------------------------------------------------------

exports.reserCompPost=async(req,res,next)=>{
  const {digitalPayCheck}=req.body
  const {id}=req.params;
  //Si el cobro se realizo por paypal, actualiza el parametro correspondiente en la reservación.
  //Por default el valor es "false", se debera entender que el usuario generara su pago de otra manera
  if(digitalPayCheck){
  await Reservation.findByIdAndUpdate(id, {digitalPayment:digitalPayCheck})
  }
/*
  passport.authenticate("local", { //se llama a si misma porque es un middleware.
  
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
    failureFlash: true
})(req, res, next)
*/
  res.redirect(`/profile`)
}

//---------------------------------------------------------------------------------------------------

exports.editBookView=async(req,res,next)=>{
  const book=await Reservation.findById(req.params.id)
  if(req.isAuthenticated()){
    res.render('reservations/editBook',{book, show:false, profile:true})
    }else{
  res.render('reservations/editBook',{book, show:false, profile:false})
    }
}

//---------------------------------------------------------------------------------------------------

exports.editBookPost=async(req,res,next)=>{
  const{startDate, endDate, numA, numC, room} = req.body
  //obtenemos numero de dias totales
  const minSD=new Date(startDate).getTime();
  const minED=new Date(endDate).getTime();
  let days=minED-minSD;
  days/=(1000 * 3600 * 24); 
  //Obtenemos valores de adultos y niños
  const adults=Number(numA)
  const children=Number(numC)
  //obtenemos costo total
  const perNigth=500;
  const priceTotal=perNigth*days;
  //Calculamos el día del año 0-365 de fecha inicial y fecha del dia
  let diff = new Date(startDate)-new Date(new Date(startDate).getFullYear(), 0, 0);
  let day = Math.floor(diff/86400000);
  const dayYearSD=day+1;
   diff = new Date()-new Date(new Date().getFullYear(), 0, 0);
   day = Math.floor(diff/86400000);
  const dayYearTod=day;
  //Formato en que se va a guardar en la base de 
  const startDateS=minSD+(3600000*19);
  const endDateS=minED+(3600000*19);
//Checamos si la primer fecha es al menos la fecha del día presente
if(dayYearSD<dayYearTod){
  msg='You need select at less today in start day'
  res.render("reservations/editBook",{msg})
  return;
}

//Checamos si la diferencia de dias es al menos de uno
if(days<=0){
  msg='You need select at less one night'
  res.render("reservations/editBook",{msg})
  return;
}  
//Comparamos valor de room para guardar su img correspondiente
let img='';
switch (room){
case 'Carla Room':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room1_rctil8.webp'
  break;
case 'Dova Room':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561493/BOKANE/room2_tbrfc6.webp'
  break;
case 'Avenu Place':
  img='https://res.cloudinary.com/jaacker25/image/upload/v1588561494/BOKANE/room3_oddrac.webp'
  break;
}
 const obj={
    startDate:new Date(startDateS).toLocaleString(),
    endDate:new Date(endDateS).toLocaleString(),
    days:days,
    totalPrice:priceTotal,
    numAdult:adults,
    numChild:children,
    room:room,
    img:img
 }
await Reservation.findByIdAndUpdate(req.params.id, obj)
res.redirect('/profile')
}





    





//---------------------------------------------------------------------------------------------------

exports.deleteBook=async(req,res,next)=>{
  await Reservation.findByIdAndDelete(req.params.id)
  res.redirect('/profile')
}

//---------------------------------------------------------------------------------------------------



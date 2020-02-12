const User = require('../models/User')
const Reservation = require('../models/Reservation')


//---------------------------------------------------------------------------------------------------

exports.reserView=(req,res,next)=>{
res.render('reservations/select')
}

//--------------------------------------------------------------------------------------------------------

exports.reserPost=(req,res,next)=>{
  const {startDate,endDate,numAdults,numChildren,checkRoom1,checkRoom2,checkRoom3}=req.body
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
 if(days<=0||numValidate!==1){
   res.redirect('/reservation')
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
  const obj={
    days:days,
    perNigth:perNigth,
    perTotal:perTotal,
    adults:a,
    children:c,
    room:op,
    startDate:sd,
    endDate:ed
  }
res.render('reservations/check',obj)
}

//---------------------------------------------------------------------------------------------------

exports.reserCheckPost=(req,res,next)=>{
  const {days,adults,children,room,perTotal,startDate,endDate}=req.body
  const numHide=999*Number(perTotal)
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
res.render('reservations/book',obj)
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

  //Crea nuevo usuraio
  const { firstName, lastName, email, password, confirmPassword} = req.body;
  const name=`${firstName} ${lastName}`;
  const userOnDB = await User.findOne({ email })
  //Check if there is a email registerd
  if (userOnDB !== null) {
    obj.msg='The email is already registered'
    res.render("reservations/book",obj)
    return;
  }
  //check if terms and conditions is ok
  if(checkConditions!=='on'){
    obj.msg='You need acept Terms and Conditions'
    res.render("reservations/book",obj)
    return;
  }
  //Check if password has at less 8 digits
  if(password.length<8){
    obj.msg='Your password need at less 8 digits'
    res.render("reservations/book",obj)
    return;
  }
 // check if las dos contrañas son iguales
  if(password!==confirmPassword){
    obj.msg='The passwords dont match'
    res.render("reservations/book",obj)
    return;
  }else{
    //Si todo esta OK, registramos un nuevo usuraio
  await User.register({ name, email }, password)
  
  const user=await User.findOne({ email })
let nameRoom='';
switch (room){
case '1':
  nameRoom='Carla Room'
  break;
case '2':
  nameRoom='Dova Room'
  break;
case '3':
  nameRoom='Paku Place'
  break;
}
  const newRes={
    user_id: user._id,
    startDate:new Date(Number(startDate)).toLocaleString(),
    endDate:new Date(Number(endDate)).toLocaleString(),
    numDays:days,
    totalPrice:perTotal,
    numAdult:adults,
    numChild:children,
    room:nameRoom
  }
  //Creamos una nueva reservacion ligada al usuario
  await Reservation.create(newRes);
  
  res.redirect(`/auth/login`)
  }
}

//--------------------------------------------------------------------------------------------------

exports.reserCompView=(req,res,next)=>{

}

//---------------------------------------------------------------------------------------------------

exports.reserCompPost=(req,res,next)=>{
  
}
exports.reserView=(req,res,next)=>{
  if(req.isAuthenticated()) return res.render('reservations/select', {show:false, profile:true})
res.render('reservations/select', {show:false, profile:false})
}

exports.reserPost=(req,res,next)=>{
 // console.log(req.body)
  const {startDate,endDate,numAdults,numChildren,checkRoom1,checkRoom2,checkRoom3}=req.body
  //console.log(startDate,endDate,numAdults,numChildren,checkRoom1,checkRoom2,checkRoom3)
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
  res.redirect(`/reservation/check?days=${days}&a=${adults}&c=${children}&op=${validate}`)
 }
}



exports.reserCheckView=(req,res,next)=>{
  const {days,a,c,op}=req.query
  console.log(days,a,c,op)
  const perNigth=500;
  const perTotal=perNigth*days;
  console.log(perTotal)
  const obj={
    days:days,
    perNigth:perNigth,
    perTotal:perTotal,
    adults:a,
    children:c,
    room:op
  }
 if(req.isAuthenticated()) return res.render('reservations/check',{obj, show:false, profile:true})
res.render('reservations/check',{obj, show:false, profile:false})
}

exports.reserCheckPost=(req,res,next)=>{
  const {days,adults,children,room,perTotal}=req.body
  const numHide=999*Number(perTotal)

  res.redirect(`/reservation/book?days=${days}&a=${adults}&c=${children}&op=${room}&nor=${numHide}`)
}





exports.reserBookView=(req,res,next)=>{
  const {nor}=req.query
  const obj={
   perTotal:nor/999
  }
  if(req.isAuthenticated()) return res.render('reservations/book', {obj, show:false, profile:true})
res.render('reservations/book',{obj, show:false, profile:false})
}

exports.reserBookPost=(req,res,next)=>{
  res.redirect(`/`)
}
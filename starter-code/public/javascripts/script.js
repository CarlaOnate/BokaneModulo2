document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFvIiwiYSI6ImNrNjgyb294aDAwb2Mzbm8ydHhncmJvbWgifQ.07bP1nWOumai4v2tmKYzHA'
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
  })

}, false);


/*

document.getElementById('check-room1').addEventListener('click',()=>{
  if(document.getElementById('check-room1').checked){
    console.log('checado')
  document.getElementById('check-room2').checked=false;
  document.getElementById('check-room3').checked=false;
  }else{
  document.getElementById('check-room2').checked=true;
  document.getElementById('check-room3').checked=true;
  }

});


document.getElementById('check-room2').addEventListener('click',()=>{
  if(document.getElementById('check-room2').checked){
  document.getElementById('check-room1').checked=false;
  document.getElementById('check-room3').checked=false;
  }else{
  document.getElementsById('check-room1').checked=true;
  document.getElementsById('check-room3').checked=true;
  }

});


document.getElementsById('check-room3').addEventListener('click',()=>{
  if(document.getElementById('check-room3').checked){
  document.getElementById('check-room2').checked=false;
  document.getElementById('check-room1').checked=false;
  }else{
  document.getElementById('check-room2').checked=true;
  document.getElementById('check-room1').checked=true;
  }

});
*/


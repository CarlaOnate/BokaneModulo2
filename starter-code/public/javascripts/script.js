document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFvIiwiYSI6ImNrNjgyb294aDAwb2Mzbm8ydHhncmJvbWgifQ.07bP1nWOumai4v2tmKYzHA' //Acces token publico
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v9',
  center: [-93.664719, 15.844154],
  zoom: 15
}
)



var marker = new mapboxgl.Marker()
  .setLngLat([-93.664719, 15.844154])
  .addTo(map);

}, false);


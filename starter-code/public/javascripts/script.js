document.addEventListener('DOMContentLoaded', () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybGFvIiwiYSI6ImNrNjgyb294aDAwb2Mzbm8ydHhncmJvbWgifQ.07bP1nWOumai4v2tmKYzHA'
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
  })

}, false);


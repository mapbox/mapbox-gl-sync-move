var mapboxgl = require('mapbox-gl');
var mapboxGlSync = require('..');

// Add the CSS
var css = document.createElement('link');
css.rel = 'stylesheet';
css.href = 'https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css'
document.head.appendChild(css);

mapboxgl.accessToken = process.env.MapboxAccessToken;

var instructions = createContainer({ mapStyle: false });
instructions.innerHTML = (
  '<p>Welcome manual tester. Please try these actions:</p>' +
  '<ul>' +
    '<li>Pan around</li>' +
    '<li>Zoom in various ways</li>' +
    '<li>Don\'t forget double-click zoom</li>' +
    '<li>And box zoom</li>' +
    '<li><button id="fly-tucson">Fly to Tucson</button></li>' +
    '<li><button id="fly-france">Fly to France</button></li>' +
    '<li>Stop one of these flights, mid-flight</li>' +
  '</ul>'
);

var mapA = new mapboxgl.Map({
  container: createContainer(),
  style: 'mapbox://styles/mapbox/light-v9'
});

var mapB = new mapboxgl.Map({
  container: createContainer({ height: 400 }),
  style: 'mapbox://styles/mapbox/dark-v9'
});

var mapC = new mapboxgl.Map({
  container: createContainer({ height: 400 }),
  style: 'mapbox://styles/mapbox/basic-v9'
});

mapA.addControl(new mapboxgl.NavigationControl());
mapB.addControl(new mapboxgl.NavigationControl());
mapC.addControl(new mapboxgl.NavigationControl());

document.getElementById('fly-tucson').addEventListener('click', function() {
  mapB.flyTo({
    center: [-110.9265, 32.2217],
    zoom: 10
  });
});

document.getElementById('fly-france').addEventListener('click', function() {
  mapA.flyTo({
    center: [2.294694, 48.858093],
    zoom: 4
  });
});

mapboxGlSync(mapA, mapB, mapC);

function createContainer(options) {
  var container = document.createElement('div');
  if (!options || options.mapStyle !== false) {
    container.style.float = 'left';
    container.style.width = '33%';
    container.style.height = '400px';

  }
  document.body.appendChild(container);
  return container;
}

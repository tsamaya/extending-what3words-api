/* eslint-env browser, jquery */
/* global L */

if (!localStorage.getItem('w3wkey')) {
  localStorage.setItem(
    'w3wkey',
    prompt('What is your w3w API key?')
  );
}
// sign up of for your api key, it is free at http://developer.what3words.com
var w3w_api_key = localStorage.getItem('w3wkey');

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoidHNhbWF5YSIsImEiOiJjajJpMXExM2swMDFmMzNvZnRnaGZpZm1tIn0.fgbo-yyT0cdkdNP0Mixuwg'
}).addTo(map);

var onMapClick = function (e) {
  var data = {
    key: w3w_api_key,
    langs: 'fr,it,en,de,es',
    coords: e.latlng.lat + ',' + e.latlng.lng
  };
  $.get('http://localhost:3000/api/reverse-ext', data, function (response) {
    if (response.error) {
      console.log(response);
    } else {
      console.log(response);
      L.popup({
        maxWidth: 300,
        minWidth: 200
      }).setLatLng(e.latlng)
        .setContent('<img src="img/flag-united-kingdom-16x16.png" alt="en">&nbsp;' +
          response.properties.words_en + '<br>' +
          '<img src="img/flag-france-16x16.png" alt="en">&nbsp;' +
          response.properties.words_fr + '<br>' +
          '<img src="img/flag-italy-16x16.png" alt="en">&nbsp;' +
          response.properties.words_it + '<br>' +
          '<img src="img/flag-spain-16x16.png" alt="en">&nbsp;' +
          response.properties.words_es + '<br>' +
          '<img src="img/flag-germany-16x16.png" alt="en">&nbsp;' +
          response.properties.words_de)
        .openOn(map);
    }
  });
};

map.on('click', onMapClick);

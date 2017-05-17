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
  maxZoom: 20,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoidHNhbWF5YSIsImEiOiJjajJpMXExM2swMDFmMzNvZnRnaGZpZm1tIn0.fgbo-yyT0cdkdNP0Mixuwg'
}).addTo(map);

var onMapClick = function (e) {
  createPopup(e.latlng);
};

var createPopup = function (latlng) {
  map.spin(true);
  var data = {
    key: w3w_api_key,
    langs: 'fr,it,en,de,es',
    coords: latlng.lat + ',' + latlng.lng
  };
  $.get('http://localhost:3000/api/reverse-ext', data, function (response) {
    map.spin(false);
    console.log(response);
    if (response.error) {
      // TODO
    } else {
      var popup = L.popup({
        maxWidth: 300,
        minWidth: 200
      });

      popup.setLatLng(latlng);
      popup.setContent('<img src="img/flag-united-kingdom-16x16.png" alt="en">&nbsp;' +
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

$(function () {
  $('#search').typeahead({
    dynamic: true,
    delay: 100,
    maxItem: 10,
    hint: true,
    source: {
      autocomplete: {
        display: ['words'],
        filter: false, // keep all results
        ajax: function (query) {
          var addr = query;
          if (addr.indexOf('///') === 0) {
            addr = addr.replace(/\/\/\//, '');
          }
          var data = {
            key: w3w_api_key,
            addr: addr,
            lang: 'en',
            count: 6
          };
          return {
            type: 'GET',
            url: 'http://localhost:3000/api/autocomplete',
            data: data,
            path: 'suggestions'
          };
        },
        template: function (query, item) {
          if (item.country) {
            return [
              '<div class="typeahead__list-inner">',
              '<span class="typeahead__twa">{{words}}</span>', '<br>',
              '<span class="typeahead__info">', '{{place}}', '</span>',
              '</div>'
            ].join('\n');
          } else {
            return item.words;
          }
        }
      }
    },
    callback: {
      onClickAfter: function (node, a, item, event) {
        console.log(item);
        var n = item.words.split('.').length - 1;
        if (n === 2) {
          map.flyTo(item.geometry);
          createPopup(item.geometry);
        } else {
          $('#search').val(item.words + '.');
        }
      }
    },
    debug: true
  });

  // var timerid;
  // $('#search').on('input', function (e) {
  //   var value = $(this).val();
  //   $('#suggestions').html('');
  //   if (value && !/^\s*$/.test(value) && $(this).data('lastval') !== value) {
  //     $(this).data('lastval', value);
  //     clearTimeout(timerid);
  //     timerid = setTimeout(function () {
  //       var str = value.trim();
  //       // change action
  //       var data = {
  //         key: w3w_api_key,
  //         lang: 'en',
  //         addr: str
  //       };
  //       $.get('http://localhost:3000/api/autocomplete', data, function (response) {
  //         console.log(response);
  //         if (response.status && response.status.code) {
  //         } else {
  //           var arr = response.suggestions;
  //           var display = '';
  //           for (var i = 0; i < arr.length; i++) {
  //             display += arr[i].words + '<br>';
  //           }
  //           $('#suggestions').html(display);
  //         }
  //       });
  //     }, 100);
  //   };
  // });
});

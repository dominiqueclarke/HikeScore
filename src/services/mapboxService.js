angular.module('HikeScore')
.service('mapboxService', function() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlY2xhcmtlIiwiYSI6ImNpbGJlZjFobjB1aXl0eWx4ajJ2emNsNHcifQ.2mpHkUWA9o2RgI2q7w1UHA';
      this.getMap = (places, center) => {
          const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/deeclarke/cit3875o5003y2xo9h9ca4xwj',
              center: [center.lon, center.lat],
              zoom: 10
          });

          const nav = new mapboxgl.Navigation({
              position: 'top-left'
          }); // position is optional
          map.addControl(nav);
          map.on('load', () => {
              map.addSource('terrain-data', {
                  type: 'vector',
                  url: 'mapbox://mapbox.mapbox-terrain-v2'
              });
              //should not have put on scope
              map.addSource('points', getGeoCoordinates(places));
              map.addLayer({
                  "id": "terrain-data",
                  "type": "line",
                  "source": "terrain-data",
                  "source-layer": "contour",
                  "layout": {
                      "line-join": "round",
                      "line-cap": "round"
                  },
                  "paint": {
                      "line-color": "#1DE9B6",
                      "line-width": 1
                  }
              });
              map.addLayer({
                  "id": "points",
                  "type": "symbol",
                  "source": "points",
                  "layout": {
                      "icon-image": "location-beacon-g",
                      "text-field": "{title}",
                      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                      "text-offset": [0, 0.6],
                      "text-anchor": "top"
                  }
              });
          });

          map.on('mousemove', function(e) {
              var features = map.queryRenderedFeatures(e.point, {
                  layers: ['points']
              });
              map.getCanvas().style.cursor = features.length ? 'pointer' : '';
          });
          return map;
      }

      function getGeoCoordinates(places) {
          var geoJson = {};
          geoJson.type = "geojson";
          geoJson.data = {
              "type": "FeatureCollection",
              "features": []
          };
          for(var place in places) {
              if (places[place].display) {
                  var points = {
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": [places[place].lon, places[place].lat]
                      },
                      "properties": {
                          "title": places[place].name,
                          "img": '<img style="height:100px; width:100px" src="' + places[place].activities[0].thumbnail + '" />',
                      }
                  }
                  geoJson.data.features.push(points);
              }
          };
          return geoJson;
      }
});

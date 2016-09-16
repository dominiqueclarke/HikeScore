angular.module('HikeScore')
    .controller('mapboxCtrl', function($scope) {
            console.log($scope.geoData);
            var geoJson = getGeoCoordinates();
            console.log(geoJson);


            function getGeoCoordinates() {
                var locationsObj = {};
                locationsObj.type = "geojson";
                locationsObj.data = {
                    "type": "FeatureCollection",
                    "features": []
                };
                for (var prop in $scope.places) {
                    var pointObj = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [$scope.places[prop].lon, $scope.places[prop].lat]
                        },
                        "properties": {
                            "title": $scope.places[prop].name,
                            "iconSize": [60, 60]
                        }
                    }
                    locationsObj.data.features.push(pointObj);
                };
                return locationsObj;
            }

            mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlY2xhcmtlIiwiYSI6ImNpbGJlZjFobjB1aXl0eWx4ajJ2emNsNHcifQ.2mpHkUWA9o2RgI2q7w1UHA';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/deeclarke/cit3875o5003y2xo9h9ca4xwj',
                center: [$scope.geoData.lon, $scope.geoData.lat],
                zoom: 10
            });

            map.on('load', function() {
                map.addSource('points', geoJson);
                map.addSource('terrain-data', {
                   type: 'vector',
                   url: 'mapbox://mapbox.mapbox-terrain-v2'
                });
                map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": "points",
                    "layout": {
                        "icon-image": "{icon}-15",
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top"
                    }
                });
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
            });

            geoJson.data.features.forEach(function(marker) {
              // create a DOM element for the marker
              var el = document.createElement('div');
              el.className = 'marker';
              el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
              el.style.width = marker.properties.iconSize[0] + 'px';
              el.style.height = marker.properties.iconSize[1] + 'px';


              // add marker to map
              new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]})
                      .setLngLat(marker.geometry.coordinates)
                      .addTo(map);
            });
        });

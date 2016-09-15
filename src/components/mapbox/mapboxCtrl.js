angular.module('HikeScore')
    .controller('mapboxCtrl', function($scope) {
            console.log($scope.geoData);
            var geoCoordinates = getGeoCoordinates();
            console.log(geoCoordinates);


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
                            "icon": "halo"
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
                zoom: 9
            });

            map.on('load', function() {
                map.addSource("points", geoCoordinates);

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
            });
        });

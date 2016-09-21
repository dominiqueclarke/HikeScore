angular.module('HikeScore')
    .controller('mapboxCtrl', function($scope) {
        var center = $scope.places[0];
        $scope.place = $scope.places[0];
        var places = $scope.places;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGVlY2xhcmtlIiwiYSI6ImNpbGJlZjFobjB1aXl0eWx4ajJ2emNsNHcifQ.2mpHkUWA9o2RgI2q7w1UHA';
        var map = {}
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/deeclarke/cit3875o5003y2xo9h9ca4xwj',
            center: [center.lon, center.lat],
            zoom: 10
        });

        $scope.selectActivity = function(activity) {
            console.log($scope.selectedActivity);
            $scope.selectedActivity = activity;
            console.log($scope.selectedActivity);
        };

        var nav = new mapboxgl.Navigation({
            position: 'top-left'
        }); // position is optional
        map.addControl(nav);

        map.on('load', function() {
            map.addSource('terrain-data', {
                type: 'vector',
                url: 'mapbox://mapbox.mapbox-terrain-v2'
            });
            //should not have put on scope
            map.addSource('points', getGeoCoordinates());
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

        // geoJson.data.features.forEach(function(marker) {
        //   // create a DOM element for the marker
        //   var el = document.createElement('div');
        //   el.className = 'marker';
        //   el.style.backgroundImage = 'url(img/icons/location-beacon.png)';
        //   el.style.width = marker.properties.iconSize[0] + 'px';
        //   el.style.height = marker.properties.iconSize[1] + 'px';
        //
        //
        //   // add marker to map
        //   new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, 0]})
        //           .setLngLat(marker.geometry.coordinates)
        //           .addTo(map);
        //   });
        map.on('click', function(e) {
            //reset selectedActivity so that all activities show when a new place is selected
            delete $scope.selectedActivity;
            // Use queryRenderedFeatures to get features at a click event's point
            // Use layer option to avoid getting results from other layers
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['points']
            });
            var id = features[0].properties.id;
            var name = features[0].properties.title;
            $scope.$apply(function() {
                for (var place in places) {
                    if (name === places[place].name) {
                        $scope.place = places[place];
                        break;
                    }
                }
            });
            // if there are features within the given radius of the click event,
            // fly to the location of the click event
            if (features.length) {
                // Get coordinates from the symbol and center the map on those coordinates
                map.flyTo({
                    center: features[0].geometry.coordinates
                });
            }

            var feature = features[0];

            //set pop up with image of location
            var popup = new mapboxgl.Popup()
              .setLngLat(feature.geometry.coordinates)
              .setHTML(feature.properties.img)
              .addTo(map);
        });



        map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ['points']
            });
            map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });

        function getGeoCoordinates() {
            var locationsObj = {};
            locationsObj.type = "geojson";
            locationsObj.data = {
                "type": "FeatureCollection",
                "features": []
            };
            //console.log(places);
            //console.log($stateParams.places);
            for(var place in places) {
                console.log(place);
                if (places[place].display) {
                    var pointObj = {
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
                    locationsObj.data.features.push(pointObj);
                }
            };
            return locationsObj;
        }
    });

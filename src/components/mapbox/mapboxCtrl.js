angular.module('HikeScore')
	.controller('mapboxCtrl', function($scope, mapboxService) {
        
		const places = $scope.places;
		const center = $scope.place = $scope.places[0];
		const map = mapboxService.getMap(places, center);

		$scope.selectActivity = (activity) => {
			$scope.selectedActivity = activity;
		};

		map.on('click', (e) => {
			//reset selectedActivity so that all activities show when a new place is selected
			delete $scope.selectedActivity;
			// Use queryRenderedFeatures to get features at a click event's point
			// Use layer option to avoid getting results from other layers
			const features = map.queryRenderedFeatures(e.point, {
				layers: ['points']
			});
			const name = features[0].properties.title;
			$scope.$apply(function() {
				for (let place in places) {
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
	});

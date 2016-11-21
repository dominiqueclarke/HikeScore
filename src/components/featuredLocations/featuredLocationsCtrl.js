angular.module('HikeScore')
	.controller('featuredLocationsCtrl', function($scope, trailsService, zipcodeService, $state) {
		$scope.featuredLocations = trailsService.getFeaturedLocations();
		$scope.createRatingRepeat = trailsService.createRatingRepeat;
		$scope.getTrailData = function(zip) {
			zipcodeService.getZipcodeData(zip) //using the zip to get the lat and lon
				.then(function(geoData) {
					//fetching trail data
					trailsService.getTrailData(geoData)
						.then(function(places) {
							//flatten activities Array
							const activities = trailsService.getActivitiesArray();
							//get rating
							const rating = trailsService.getRating();

							$state.go('results', {
								zip,
								places,
								activities,
								geoData,
								rating
							});
						});
				});
		};
	});
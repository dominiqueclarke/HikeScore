angular.module('HikeScore')
  .controller('queryCtrl', function($scope, trailsService, zipcodeService, $state){
    $scope.stateRef = $state.current.name;
    $scope.placeholder = "ENTER A ZIPCODE"
    $scope.featuredLocations = trailsService.getFeaturedLocations();
    $scope.createRatingRepeat = trailsService.createRatingRepeat;
    $scope.getTrailData = function(zip) {
      var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
      if(!isValidZip) {
        //using the scope of the input to reassign ng-model to give user feedback on query
        var scope = angular.element('input').scope();
        scope.zipcodeInput = "Please enter a valid zipcode";
      }
      else {
        zipcodeService.getZipcodeData(zip) //using the zip to get the lat and lon
        .then(function(results) {
            $scope.geoData = results; //placing the geoData on the scope so we can use it to alert the user of their location
            $scope.geoData.zip = zip;
            //using the scope of the input to reassign ng-model to give user feedback on query
            var scope = angular.element('input').scope();
            scope.zipcodeInput = $scope.geoData.address;
            //fetching trail data
            trailsService.getTrailData(results.lat, results.lon, $scope.geoData)
            .then(function(places) {
              //sorting activities by distance
              places.sort(function(a, b){
                return a.distance - b.distance;
              });
              //flattening the Array
              const activities = trailsService.getActivitiesArray();
              $scope.places = places;
              $scope.activities = activities;
              //get rating
              $scope.rating = trailsService.getRating();
              $state.go('results', {zip: zip, places: $scope.places, activities: $scope.activities, geoData: $scope.geoData, rating: $scope.rating});
            });
        });
      }
    }
  })

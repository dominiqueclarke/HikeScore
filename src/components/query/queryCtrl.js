angular.module('HikeScore')
  .controller('queryCtrl', function($scope, trailsService, zipcodeService, $state){
    $scope.stateRef = $state.current.name;
    $scope.placeholder = "ENTER A ZIPCODE";
    $scope.featuredLocations = trailsService.getFeaturedLocations();
    $scope.getTrailData = function(zip) {
      const validatedZip = $scope.validatedZip = zipcodeService.validateZip(zip);
      if(validatedZip) {
        zipcodeService.getZipcodeData(zip) //using the zip to get the lat and lon
        .then(function(geoData) {
            $scope.geoData = geoData; //placing the geoData on the scope so we can use it to alert the user of their location
            $scope.geoData.zip = zip;
            //using the scope of the input to reassign ng-model to give user feedback on query
            const scope = angular.element('input').scope();
            scope.zipcodeInput = $scope.geoData.address;
            //fetching trail data
            trailsService.getTrailData($scope.geoData)
            .then(function(places) {
              //flatten activities Array
              const activities = trailsService.getActivitiesArray();
              //get rating
              const rating = trailsService.getRating();

              $state.go('results', {zip, places, activities, geoData, rating});
            });
        });
      }
    }
  })

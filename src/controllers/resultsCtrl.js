angular.module('HikeScore')
.controller('resultsCtrl', function($scope, $stateParams, $state, trailsService, zipcodeService, mapboxService){
    $scope.createRatingRepeat = trailsService.createRatingRepeat;
    $scope.filterActivity = function(activity) {
        $scope.activityFilter = activity;
    };
    //put a zip code check in place
    //put a status check into zip code service for google
    if($stateParams.zip !== null) {
      if($stateParams.places === null) {
        const zip = $scope.zip = $stateParams.zip;
        const validatedZip = $scope.validatedZip = zipcodeService.validateZip(zip);
        //console.log(validatedZip);
        if(validatedZip) {
          zipcodeService.getZipcodeData(zip) //using the zip to get the lat and lon
          .then(function(geoData) {
              //$scope.geoData = geoData; //placing the geoData on the scope so we can use it to alert the user of their location
              //$scope.geoData.zip = geoData.zip;
              if(!geoData) {
                $scope.validatedZip = false;
              }
              else {
                $scope.city = geoData.address;
                //fetching trail data
                trailsService.getTrailData(geoData)
                .then(function(places) {
                  //flattening the Array
                  $scope.activities = trailsService.getActivitiesArray();
                  $scope.places = places;
                  //get rating
                  $scope.rating = trailsService.getRating();
                });
              }
          });
        };
      }
      else {
        $scope.rating = $stateParams.rating;
        //$scope.zip = $stateParams.zip;
        // $scope.geoData = $stateParams.geoData;
        $scope.city = $stateParams.geoData.address;
        $scope.places = $stateParams.places;
        $scope.activities = $stateParams.activities;
      }
    }
});

angular.module('HikeScore')
  .controller('queryCtrl', function($scope, meetupService, trailsService, zipcodeService, $state){

    // var getMeetupData = meetupService.getMeetupData();
    // getMeetupData.then(function(data) {
    //   console.log(data.data);
    //   $scope.meetups = data.data;
    // })
    console.log($state);
    $scope.stateRef = $state.current.name;
    $scope.placeholder = "ENTER A ZIPCODE"
    $scope.featuredLocations = trailsService.getFeaturedLocations();
    $scope.createRatingRepeat = trailsService.createRatingRepeat;
    console.log($scope.stateRef);


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
            //using the scope of the input to reassign ng-model to give user feedback on query
            var scope = angular.element('input').scope();
            scope.zipcodeInput = $scope.geoData.address;
            //fetching trail data
            trailsService.getTrailData(results.lat, results.lon)
            .then(function(places) {
              for(var prop in places) {
                //log the length of the place city
                //This code is in the controller instead of service because it requires use of scope
                //places[prop].display = true;
                if(places[prop].city === null) {
                  places[prop].display = false;
                }
                else {
                  var placeObj = {
                    lat: places[prop].lat
                    , lon: places[prop].lon
                  };
                  places[prop].distance = zipcodeService.getDistance($scope.geoData, placeObj);
                  places[prop].humanReadableDistance = zipcodeService.getDistance($scope.geoData, placeObj) + " miles from " + zip; //adding human readable text to miles in controller instead of service since controller has access to scope.
                }
              }
              //sorting activities by distance
              places.sort(function(a, b){
                return a.distance - b.distance;
              });
              $scope.places = places;
              //get rating
              $scope.rating = trailsService.getRating();
              $state.go('results', {zip: zip, places: $scope.places, geoData: $scope.geoData, rating: $scope.rating});
            });
        });
      }
    }
  })

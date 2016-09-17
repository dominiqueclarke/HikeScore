angular.module('HikeScore')
  .controller('mainCtrl', function($scope, meetupService, trailsService, zipcodeService, $state){
    $scope.test = "this is working";

    //var pullAllSearches = mainService.pullAllSearches;
    //pullAllSearches()

    var getMeetupData = meetupService.getMeetupData();
    getMeetupData.then(function(data) {
      console.log(data.data);
      $scope.meetups = data.data;
    })

    $scope.getTrailData = function(zip) {
      var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
      if(!isValidZip) {
        $scope.geoData = {};
        $scope.geoData.error = "Please enter a valid Zip Code";
      }
      else {
        zipcodeService.getZipcodeData(zip) //using the zip to get the lat and lon
        .then(function(results) {
            $scope.geoData = results; //placing the geoData on the scope so we can use it to alert the user of their location
            trailsService.getTrailData(results.lat, results.lon)
            .then(function(places) {
              for(var prop in places) {
                //log the length of the place city
                //This code is in the controller instead of service because it requires use of scope
                places[prop].display = true;
                if(places[prop].city === null) {
                  places[prop].display = false;
                }
                else {
                  var cityLength = places[prop].city.length;
                  //create a substring of cityLength from geoData address, and compare to place city to see if it's the same city
                  if($scope.geoData.address.substring(0, cityLength) === places[prop].city) {
                    places[prop].distance = null; //register that it's the same city
                  }
                  else {
                    var placeObj = {
                      lat: places[prop].lat
                      , lon: places[prop].lon
                    };
                    places[prop].distance = zipcodeService.getDistance($scope.geoData, placeObj);
                    places[prop].humanReadableDistance = zipcodeService.getDistance($scope.geoData, placeObj) + " miles from " + $scope.geoData.address.substring(0, $scope.geoData.address.indexOf(',')); //adding human readable text to miles in controller instead of service since controller has access to scope.
                  }
                }
              }
              $scope.places = places;
              $state.go('results', {zip: zip, places: $scope.places, geoData: $scope.geoData});
            });
            // console.log('StartTimeout');
            // setTimeout(function() {
            //   $state.go('results', {zip: zip, places: $scope.places, geoData: $scope.geoData});
            //   console.log('Timeout');
            // }, 3000);
        });
      }
    }
  })

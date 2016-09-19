angular.module('HikeScore')
.service('zipcodeService', function($http) {
  var zipcodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  var distanceBaseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
  var zipcodeKey = '&key=AIzaSyDXJ8TQvl3DT2HNEx0YY3WehdtMlKdXUYI'
  var distanceKey = '&key=AIzaSyA60Ws5uiRuszS8MfGBe7cW_3E1rOBV6bY'

  this.getZipcodeData = function(zip) {
      return $http({
        url: zipcodeBaseUrl + zip + '&sensor=true' + zipcodeKey
        , type: 'GET'
      }).then(function(results){
        console.log(results);
        var geoData = {}
        geoData.zip = zip;
        geoData.lat = results.data.results[0].geometry.location.lat;
        geoData.lon = results.data.results[0].geometry.location.lng;
        var address = results.data.results[0].formatted_address;
        geoData.address = address.slice(0, address.indexOf(zip)).trim(); //parse the data down to just the city and state
        return geoData;
      })
   }
  this.getDistance = function(start, end) {
     var R = 3961; // Radius of the earth in miles
     var dLat = deg2rad(end.lat-start.lat);  // deg2rad below
     var dLon = deg2rad(end.lon-start.lon);
     var a =
       Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) *
       Math.sin(dLon/2) * Math.sin(dLon/2)
       ;
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c; // Distance in miles
     return Math.round(d * 10) / 10;
   }

   function deg2rad(deg) {
     return deg * (Math.PI/180)
   }

  //  this.getDistanceData = function(start, end) {
  //    origin = 'origins=' + start.lat + "," + start.lon;
  //    destination = '&destinations=' + end.lat + "," + end.lon;
  //    return $http({
  //      url:distanceBaseUrl + origin + destination + distanceKey
  //      , type: 'GET'
  //    })
  //  }

   function validateZip(zip) {
     var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
     if(!isValidZip) {
       var geoData = {}
       geoData.error = "Please enter a valid Zip Code";
       return geoData;
     }
     return zip;
   }
})

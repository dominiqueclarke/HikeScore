angular.module('HikeScore')
.service('zipcodeService', function($http) {
  const zipcodeBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const zipcodeComponents = '&components=postal_code:'
  const zipcodeKey = '&key=AIzaSyDXJ8TQvl3DT2HNEx0YY3WehdtMlKdXUYI'

  this.validateZip = zip => {
    const validatedZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    if(!validatedZip) {
      //using the scope of the input to reassign ng-model to give user feedback on query
      var scope = angular.element('input').scope();
      if(scope) {
        scope.zipcodeInput = "Please enter a valid zipcode";
      }
      return false;
    }
    return validatedZip;
  }

  this.getZipcodeData = function(zip) {
      //console.log(zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey);
      return $http({
        url: zipcodeBaseUrl + zip + zipcodeComponents + zip + '&sensor=true' + zipcodeKey
        , type: 'GET'
      }).then(function(results){
          if(results.data.status === "ZERO_RESULTS") {
            return false;
          }
          const geoData = {}
          geoData.zip = zip;
          geoData.lat = results.data.results[0].geometry.location.lat;
          geoData.lon = results.data.results[0].geometry.location.lng;
          const address = results.data.results[0].formatted_address;
          geoData.address = address.slice(0, address.indexOf(zip)).trim();
          geoData.city = address.slice(0, address.indexOf(zip)).trim()//parse the data down to just the city and state
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

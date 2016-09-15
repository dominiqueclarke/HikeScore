angular.module('HikeScore')
.service('trailsService', function($http, $q, zipcodeService) {

var trailsBaseUrl = 'https://trailapi-trailapi.p.mashape.com/?radius=25&';
var trailsKey = 'XYN4UCKBuGmshhnBDXLJYjLJZMwKp1DdwaIjsnFjsSATwnxYuK'

this.getTrailData = function (lat, lon) {
  latStr = 'lat=' + lat;
  lonStr = 'lon=' + lon;
  console.log(trailsBaseUrl + latStr + '&' + lonStr);
  return $http({
    url: trailsBaseUrl + latStr + '&' + lonStr // The URL to the API. You can get this in the API page of the API you intend to consume
    , type: 'GET'
    , headers: {"X-Mashape-Authorization": trailsKey, 'Accept': 'text/plain'}
  })
  .then(function(results) {
    console.log(results);
    var places = results.data.places;
    for(var x in places) {
      for(var y in places[x].activities)
        places[x].activities[y].length += " miles long";
    }
    return results.data.places;
  });
}

});

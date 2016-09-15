angular.module('HikeScore')
.service('trailsService', function($http, $q) {

var trailsBaseUrl = 'https://trailapi-trailapi.p.mashape.com/?radius=25&lat=32.7863301&lon=-96.79625279999999';
var trailsKey = 'XYN4UCKBuGmshhnBDXLJYjLJZMwKp1DdwaIjsnFjsSATwnxYuK'

this.getTrailData = function (lat, lon) {
  console.log('Working');
  lat = 'lat=' + lat;
  lon = 'lon=' + lon;
  return $http({
    url: trailsBaseUrl + lat + '&' + lon // The URL to the API. You can get this in the API page of the API you intend to consume
    , type: 'GET'
    , headers: {"X-Mashape-Authorization": trailsKey, 'Accept': 'text/plain'}
  });
}

});

angular.module('HikeScore')
.service('trailsService', function($http, $q) {

var trailsBaseUrl = 'https://trailapi-trailapi.p.mashape.com/?';
var trailsKey = 'XYN4UCKBuGmshhnBDXLJYjLJZMwKp1DdwaIjsnFjsSATwnxYuK'

this.getTrailData = function () {
  return $http({
    url: 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=hiking&q[city_cont]=Denver&radius=25' // The URL to the API. You can get this in the API page of the API you intend to consume
    , type: 'GET'
    , headers: {"X-Mashape-Authorization": trailsKey, 'Accept': 'text/plain'}
  });
}

});

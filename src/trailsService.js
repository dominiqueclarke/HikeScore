angular.module('HikeScore')
.service('trailsService', function($http, $q, zipcodeService) {

var rating = {};
this.getRating = function() {
  return rating;
}

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
    //assign repeating
    if(places.length > 80) {
      rating = {numberRating: 4, textRating: 'extremely'};
    }
    else if(places.length > 60) {
      rating = {numberRating: 3, textRating: 'really'}
    }
    else if(places.length > 40) {
      rating = {numberRating: 2, textRating: 'pretty'}
    }
    else if(places.length > 20) {
      rating = {numberRating: 1, textRating: 'sorta'}
    }
    else {
      rating = {numberRating: 0, textRating: 'not too'}
    }

    //format data
    for(var place in places) {
      if(places[place].activities.length === 0) {
        places[place].display = false;
      }
      else {
        places[place].display = true;
      }
      for(var activity in places[place].activities) {
        if(places[place].activities[activity].thumbnail === null) {
          places[place].activities[activity].thumbnail = 'http://placehold.it/350x350';
        }
        if(places[place].activities[activity].activity_type_name === "camping" ||
          places[place].activities[activity].activity_type_name === "snow sports") {
          delete places[place].activities[activity].length;
        }
        else {
          if(places[place].activities[activity].length > 1) {
            places[place].activities[activity].length += " miles long";
          }
          else if(places[place].activities[activity].length === 1) {
            places[place].activities[activity].length = " mile long";
          }
          else {
            places[place].activities[activity].length = "Less than a mile long";
          }
        }
      }
    }
    return places;
  });
}

});

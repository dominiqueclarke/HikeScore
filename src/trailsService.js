angular.module('HikeScore')
.service('trailsService', function($http, $q, zipcodeService) {

var rating = {};
this.getRating = function() {
  return rating;
}

this.createRatingRepeat = function(rating) {
  return new Array(rating);
};

this.getFeaturedLocations = function() {
  return featuredLocations;
}

// Trail Data
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
      else if(places.length = 0 || places.length === undefined) {
        rating = {numberRating: 0, textRating: 'not'}
      }
      else {
        rating = {numberRating: 0, textRating: 'not too'}
      }

      //format data
      for(var place in places) {
        //don't display activities that don't have a length
        if(places[place].activities.length === 0) {
          places[place].display = false;
        }
        else {
          places[place].display = true;
        }
        for(var activity in places[place].activities) {
          //registering what activities are including in the rating
          var i = 0;
          while(i <= 4) {
            if(places[place].activities[activity].activity_type_name === 'hiking') {
              rating.hiking = true;
              i++;
            }
            if(places[place].activities[activity].activity_type_name === 'mountain biking') {
              rating.biking = true;
              i++;
            }
            if(places[place].activities[activity].activity_type_name === 'camping') {
              rating.camping = true;
              i++;
            }
            if(places[place].activities[activity].activity_type_name === 'snow sports') {
              rating.snow = true;
              i++;
            }
          }
          //creating thumbnails for activities that don't have them
          var int = getRandomInt(0,placeholderArr.length - 1);
          if(places[place].activities[activity].thumbnail === null) {
            places[place].activities[activity].thumbnail = placeholderArr[int];
          }
          //deleting length property for hiking and snow sports. doesn't make sense
          if(places[place].activities[activity].activity_type_name === "camping" ||
            places[place].activities[activity].activity_type_name === "snow sports") {
            delete places[place].activities[activity].length;
          }
          //adding proper mile designations
          else {
            if(places[place].activities[activity].length > 1) {
              places[place].activities[activity].length += " miles long";
            }
            else if(places[place].activities[activity].length === 1) {
              places[place].activities[activity].length += " mile long";
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
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var placeholderArr = [
    'img/placeholder-1.jpg'
    , 'img/placeholder-2.jpg'
    , 'img/placeholder-3.jpg'
  ];

  var featuredLocations = [
    {name:"Boulder, CO", rating:4, zip:80310, thumbnail: 'img/boulder.jpg'}
    , {name: "Philadelphia, PA", rating:2, zip:19143, thumbnail: 'img/philadelphia.jpg'}
    , {name: "Dallas, TX", rating:1, zip:75201, thumbnail:'img/dallas-1.jpg'}
  ]
});

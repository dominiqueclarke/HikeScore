angular.module('HikeScore')
.service('trailsService', function($http, $q, zipcodeService) {

let places = [];
let rating = {};

this.getFeaturedLocations = () => {
  return featuredLocations;
};

this.getRating = () => {
  return rating;
};

this.createRatingRepeat = (rating) => {
  return new Array(rating);
};

this.getActivitiesArray = () => {
  //flattening the Array
  const activities = [];
  places.forEach(function(place){
    place.activities.forEach(function(activity) {
      var x = activity;
      x.placeCity = place.city;
      x.placeState = place.state;
      x.placeDistance = place.humanReadableDistance;
      x.display = place.display;
      activities.push(x);
    })
  })
  return activities;
}

// Trail Data
const trailsBaseUrl = 'https://trailapi-trailapi.p.mashape.com/?radius=25&';
const trailsKey = 'XYN4UCKBuGmshhnBDXLJYjLJZMwKp1DdwaIjsnFjsSATwnxYuK'

this.getTrailData = (geoData) => {
  const latStr = 'lat=' + geoData.lat;
  const lonStr = 'lon=' + geoData.lon;
  return $http({
    url: trailsBaseUrl + latStr + '&' + lonStr // The URL to the API. You can get this in the API page of the API you intend to consume
    , type: 'GET'
    , headers: {"X-Mashape-Authorization": trailsKey, 'Accept': 'text/plain'}
  })
  .then( (results) => {
    places = results.data.places;
    //assign rating
    getRating(places);
    //format data
    for(let plc in places) {
      const place = places[plc];
      //console.log(place);
      //don't display activities that don't have a length
      getDisplayProperty(place);
      //calculate distance from zipcode
      getDistance(place, geoData);

      for(let actv in place.activities) {
        const activity = place.activities[actv];
        //Registering if a location contains a certain activity
        if(!rating.hiking || !rating.biking || !rating.camping || !rating.snow) {
          registerActivities(activity);
        }
        //creating thumbnails for activities that don't have them
        addThumbnails(activity);
        //deleting length property for hiking and snow sports. doesn't make sense
        deleteCampAndSnowLength(activity);
        //adding proper mile designations
        formatActivityLength(activity);
      }
    }
    //sorting activities by distance
    orderByDistance(places);
    return places;
  });
}

//Helper Functions
function getRating(places) {
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
  else if(places.length === 0 || places.length === undefined) {
    rating = {numberRating: 0, textRating: 'not'}
  }
  else {
    rating = {numberRating: 0, textRating: 'not too'}
  }
}

function getDisplayProperty(place) {
  if(place.activities.length === 0 || places.city === null) {
    place.display = false;
  }
  else {
    place.display = true;
  }
};

function getDistance(place, geoData) {
  const placeLocation = {
    lat: place.lat
    , lon: place.lon
  };
  place.distance = zipcodeService.getDistance(geoData, placeLocation);
  place.humanReadableDistance = zipcodeService.getDistance(geoData, placeLocation) + " miles from " + geoData.zip; //adding human readable text to miles in controller instead of service since controller has access to scope.
  return place;
};

function registerActivities(activity) {
  if(activity.activity_type_name === 'hiking') {
    rating.hiking = true;
  }
  else if(activity.activity_type_name === 'mountain biking') {
    rating.biking = true;
  }
  else if(activity.activity_type_name === 'camping') {
    rating.camping = true;
  }
  else if(activity.activity_type_name === 'snow sports') {
    rating.snow = true;
  }
};

function addThumbnails(activity) {
  var int = getRandomInt(0,placeholderArr.length - 1);
  if(activity.thumbnail === null) {
    activity.thumbnail = placeholderArr[int];
  }
}

function deleteCampAndSnowLength(activity) {
  if(activity.activity_type_name === "camping" ||
    activity.activity_type_name === "snow sports") {
    delete activity.length;
  }
}

function formatActivityLength(activity) {
  if(activity.length !== undefined) {
    if(activity.length > 1) {
      activity.length += " miles long";
    }
    else if(activity.length === 1) {
      activity.length += " mile long";
    }
    else {
      activity.length = "Less than a mile long";
    }
  }
}

function orderByDistance(places) {
  places.sort((a, b) => {
    return a.distance - b.distance;
  });
  return places;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Placeholder and featured locations data
const placeholderArr = [
  'img/placeholder-1.jpg'
  , 'img/placeholder-2.jpg'
  , 'img/placeholder-3.jpg'
];

const featuredLocations = [
  {name:"Boulder, CO", rating:4, zip:80310, thumbnail: 'img/boulder.jpg'}
  , {name: "Philadelphia, PA", rating:2, zip:19143, thumbnail: 'img/philadelphia.jpg'}
  , {name: "Dallas, TX", rating:1, zip:75201, thumbnail:'img/dallas-1.jpg'}
]

});

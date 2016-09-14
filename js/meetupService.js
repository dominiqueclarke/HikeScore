angular.module('HikeScore')
.service('meetupService', function($http, $q) {
var meetupBaseUrl = 'https://api.meetup.com/find/groups?&radius=10&category=23&zip=';
var meetupKey = '&key=316117544802f67c622333601c272&sign=true&photo-host=public';

// function concatQueryStrings(meetups) {
//   var QueryString = "";
//   meetups2.forEach(function(entry, index) {
//     if(index === meetups.length - 1) {
//       QueryString += entry.id;
//     }
//     else {
//       QueryString += entry.id + ",";
//     }
//   })
//   console.log(meetupQueryString);
//   return meetupQueryString;
// }
// 'https://api.meetup.com/2/events?key=ABDE12456AB2324445&group_urlname=ny-tech&sign=true'
this.getMeetupData = function (zip) {
  return $http( {
    url: meetupBaseUrl + '75201' + meetupKey
    , method: 'GET'
  })
}

});

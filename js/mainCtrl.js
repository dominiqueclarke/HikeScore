angular.module('HikeScore')
  .controller('mainCtrl', function($scope, meetupService, trailsService){
    $scope.test = "this is working";

    //var pullAllSearches = mainService.pullAllSearches;
    //pullAllSearches();
    var getTrailData = trailsService.getTrailData();
    getTrailData.then(function(data) {
      console.log(data.data);
      $scope.trails = data.data;
    })

    var getMeetupData = meetupService.getMeetupData();
    getMeetupData.then(function(data) {
      console.log(data.data);
      $scope.meetups = data.data;
    })
  })

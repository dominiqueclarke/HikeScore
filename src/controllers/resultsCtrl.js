angular.module('HikeScore')
.controller('resultsCtrl', function($scope, $stateParams, $state){
    $scope.rating = $stateParams.rating;
    $scope.zip = $stateParams.zip;
    $scope.geoData = $stateParams.geoData;
    $scope.places = $stateParams.places;
    $scope.stateRef = $stateParams.stateRef;
    $scope.filterActivity = function(activity) {
        $scope.activityFilter = activity;
    };
    $scope.createRatingRepeat = function(rating) {
      return new Array(rating);
    };
});

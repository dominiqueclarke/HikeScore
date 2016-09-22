angular.module('HikeScore')
.controller('resultsCtrl', function($scope, $stateParams, $state, trailsService){
    $scope.rating = $stateParams.rating;
    $scope.zip = $stateParams.zip;
    $scope.geoData = $stateParams.geoData;
    $scope.city = $stateParams.geoData.address;
    $scope.places = $stateParams.places;
    $scope.activities = $stateParams.activities;
    $scope.stateRef = $stateParams.stateRef;
    $scope.createRatingRepeat = trailsService.createRatingRepeat;
    $scope.filterActivity = function(activity) {
        $scope.activityFilter = activity;
    };
});

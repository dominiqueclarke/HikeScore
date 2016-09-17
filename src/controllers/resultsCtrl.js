angular.module('HikeScore')
  .controller('resultsCtrl', function($scope, $stateParams, $state){
    $scope.geoData = $stateParams.geoData;
    $scope.places = $stateParams.places;
    $scope.filterActivity = function(activity) {
        console.log($scope.activityFilter);
        $scope.activityFilter = activity;
        console.log($scope.activityFilter);
    };

    function init() {
      console.log($stateParams);
      for(var i = 0; i < $scope.places.length; i++) {
        console.log(i + " " + $scope.places[i].name);
      }
    }
    init();
});

angular.module('HikeScore')
  .controller('resultsCtrl', function($scope, $stateParams, $state){
    $scope.geoData = $stateParams.geoData;
    $scope.places = $stateParams.places;
    function init() {
      console.log($stateParams);
    }
    init();
});

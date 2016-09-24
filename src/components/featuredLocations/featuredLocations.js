angular.module('HikeScore')
.directive('featuredLocations', function() {
  return {
    restrict: 'E'
    , replace: true
    , templateUrl: './src/components/featuredLocations/featuredLocations.html'
    , scope: {
      stateRef: "="
    }
    , controller: 'featuredLocationsCtrl'
  }
});

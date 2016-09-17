angular.module('HikeScore')
.directive('mapbox', function() {
  return {
    restrict: 'E'
    , replace: true
    , templateUrl: './src/components/mapbox/mapbox.html'
    , scope: {
      places: "="
      , geoData: "="
    }
    , controller: 'mapboxCtrl'
    //, controllerAs: 'ctrl'
  }
});

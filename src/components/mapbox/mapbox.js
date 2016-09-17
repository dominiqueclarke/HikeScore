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
    // , link: function(scope) {
    //   scope.selectActivity = function(activity) {
    //     console.log(scope.selectedActivity);
    //     scope.selectedActivity = activity;
    //     console.log(scope.selectedActivity);
    //   };
    // }
  }
});

angular.module('HikeScore')
.directive('query', function() {
  return {
    restrict: 'E'
    , replace: true
    , templateUrl: './src/components/query/query.html'
    , controller: 'queryCtrl'
  }
});

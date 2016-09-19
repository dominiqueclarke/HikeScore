angular.module('HikeScore', ['ui.router', 'ui.materialize'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: '/'
      , templateUrl: "templates/landing.html"
    })
    .state('results', {
      url: "/location/:zip"
      , templateUrl: "templates/results.html"
      , controller: "resultsCtrl"
      , params: {zip: null, places: null, geoData: null, rating: null}
    })
});

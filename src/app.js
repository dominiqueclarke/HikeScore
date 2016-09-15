angular.module('HikeScore', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: '/'
      , templateUrl: "templates/landing.html"
      , controller: 'mainCtrl'
    })
    .state('results', {
      url: "/location/:zip"
      , templateUrl: "templates/results.html"
      , controller: "resultsCtrl"
      , params: {zip: null, places: null, geoData: null}
    })
    .state("contacts", {
      url: "/contacts"
      , templateUrl: "./src/templates/contacts.html"
      , controller: "contactsCtrl"
    })
});

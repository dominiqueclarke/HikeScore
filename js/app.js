angular.module('HikeScore', ['ui.router'])
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
      , params: {zip: null, places: null}
    })
    .state("contacts", {
      url: "/contacts"
      , templateUrl: "./src/templates/contacts.html"
      , controller: "contactsCtrl"
    })
});

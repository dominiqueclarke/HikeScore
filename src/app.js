angular.module('HikeScore', ['ui.router', 'ui.materialize', 'masonry', 'ngAnimate'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: "templates/landing.html"
			})
			.state('results', {
				url: "/location/:zip",
				templateUrl: "templates/results.html",
				controller: "resultsCtrl",
				params: {
					zip: null,
					places: null,
					activities: null,
					geoData: null,
					rating: null
				}
			})
	})
	.run(function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function() {
			$("html, body").animate({
				scrollTop: 0
			});
		})
	})
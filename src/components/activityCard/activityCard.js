angular.module('HikeScore')
	.directive('activityCard', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './src/components/activityCard/activityCard.html',
			scope: {
				activity: "="
			}
		}
	});
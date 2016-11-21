angular.module('HikeScore')
	.filter('to_trusted', ['$sce', function($sce) {
		return function(value, type) {
			return $sce.trustAs(type || 'html', value);
		}
	}]);
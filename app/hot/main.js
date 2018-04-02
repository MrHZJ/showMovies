(function(angular){
	'use strict';

	var movie = angular.module('movie.hot', ['ngRoute']);

		movie.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/hot', {
				templateUrl: 'hot/view.html',//路径是以index.html为基础，因为模板放在上面
				controller: 'hotController'
			});
		}]);

		movie.controller('hotController', [function() {

		}]);
})(angular);


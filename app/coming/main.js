(function(angular){
	'use strict';

	var movie = angular.module('movie.coming', ['ngRoute']);

		movie.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/coming', {
				templateUrl: 'coming/view.html',//路径是以index.html为基础，因为模板放在上面
				controller: 'comingController'
			});
		}]);

		movie.controller('comingController', ['$scope',function($scope) {

		}]);
})(angular);


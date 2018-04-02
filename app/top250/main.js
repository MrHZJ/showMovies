(function(angular){
	'use strict';

	var movie = angular.module('movie.top250', ['ngRoute']);

		movie.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/top250', {
				templateUrl: 'top250/view.html',//路径是以index.html为基础，因为模板放在上面
				controller: 'top250Controller'
			});
		}]);

		movie.controller('top250Controller', ['$scope',function($scope) {

		}]);
})(angular);


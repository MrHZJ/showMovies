(function(angular){
	'use strict';
// Declare app level module which depends on views, and components
	angular.module('movies', [
		'ngRoute',
		'movie.hot',
		'movie.coming',
		'movie.top250'
	]).
		config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({//为什么打开首页直接跳到view2视图
				redirectTo: '/hot'
			});
		}]);
})(angular);


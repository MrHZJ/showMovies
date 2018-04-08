(function(angular){
	'use strict';
// Declare app level module which depends on views, and components
	angular.module('movies', [
		'ngRoute',
		'loagPage.controller'
		//'movie.hot',
		//'movie.coming',
		//'movie.top250'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({
			redirectTo: '/hot/1'
		});
	}])
	.directive('autoFocus',[function(){

	}]);
})(angular);




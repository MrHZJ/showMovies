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
		$routeProvider.when('/:type/:page', {
			templateUrl: 'controller/loadPage.html',//路径是以index.html为基础，因为模板放在上面
			controller: 'pageControllers'
		}).otherwise({
			redirectTo: '/hot/1'
		});
	}])
	//.config(['$routeProvider', function($routeProvider) {
	//	$routeProvider.otherwise({
	//		redirectTo: '/hot/1'
	//	});
	//}])
	.directive('autoFocus',[function(){

	}]);
})(angular);




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
			redirectTo: '/in_theaters/1'
		});
	}])
	.controller('app.controlller',['$scope','$location',function($scope,$location){

			$scope.$location = $location;
			$scope.type = 'in_theaters'
			$scope.$watch('$location.path()',function(now){
				console.log(now)
				var type = now.split('/')[1];
				$scope.type = type;

			})
		}]
	)
	.directive('autoFocus',[function(){

	}]);
})(angular);




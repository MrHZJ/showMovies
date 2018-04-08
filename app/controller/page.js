/**
 * Created by zhijun on 2018/4/6.
 */
(function(angular){
	'use strict';

	var pageController = angular.module('loagPage.controller',['ngRoute','loadPage.service']);

	pageController.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:type/:page', {
			templateUrl: 'controller/loadPage.html',//路径是以index.html为基础，因为模板放在上面
			controller: 'pageControllers'
		});
	}]);

	pageController.controller('pageControllers',["$scope",'$routeParams','pageServices','$route',function($scope,$routeParams,pageServices,$route){
		console.log($routeParams);
		//$scope.text = $routeParams.type;

		$scope.title = '';
		$scope.data = '';
		$scope.total = '';//总共几条记录
		$scope.totalPage = '';//总共几页
		$scope.count = 5;//页记录数
		$scope.status = $routeParams.type;
		$scope.page = 1;
		//console.log($scope.status);

		function ajax(start,count,cbFn){
			var parames = {
				url : '//api.douban.com/v2/movie/in_theaters',
				data : {
					"start" : start,
					"count" : count
				},
				cbKey : 'callback',
				cbVal : 'cb',
				callback : cbFn
			};

			return parames;
		}

		$scope.$http = pageServices.$http(
			ajax(0,
				 $scope.count,
				function(res){
					//console.log(JSON.stringify(res));
					var res = res;
					$scope.total = res.total;
					$scope.title = res.title;
					$scope.totalPage = Math.ceil(res.total / $scope.count);
					$scope.data = res.subjects;
					$scope.$apply();
		}));

		//$scope.checkPage = function(num){
		//	var page = $routeParams.page;
		//	var type = $routeParams.type;
		//	var num = num;
        //
		//	if(num){//next
		//		page++;
		//		if(page > $scope.totalPage){
		//			page = $scope.totalPage;
		//		}
		//		$route.updateParams({page : page,type:type});
		//	}else {//0 prev
		//		page--;
		//		if(page <= 1){
		//			page = 1;
		//		}
		//		$route.updateParams({page : page,type:type});
		//	}
        //
        //
		//	pageServices.$http(
		//		ajax(((page - 1) * $scope.count),
		//			$scope.count,
		//			function(res){
		//				//0 -->prev 1--->next
        //
		//				//console.log(num);
		//				console.log('页数 ：' + page);
		//				console.log('start : ' +((page - 1) * $scope.count));
		//				$scope.page = page;
		//				var res = res;
		//				$scope.total = res.total;
		//				$scope.title = res.title;
		//				$scope.data = res.subjects;
		//				$scope.$apply();
		//			}
		//		))
		//}

	}]);

})(angular);

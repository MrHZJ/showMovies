/**
 * Created by zhijun on 2018/4/6.
 */
(function(angular){
	'use strict';

	var pageController = angular.module('loagPage.controller',['ngRoute','loadPage.service']);

	//pageController.config(['$routeProvider', function($routeProvider) {
	//	$routeProvider.when('/:type/:page', {
	//		templateUrl: 'controller/loadPage.html',//路径是以index.html为基础，因为模板放在上面
	//		controller: 'pageControllers'
	//	});
	//}]);
	pageController.controller('pageControllers',["$scope",'$routeParams','pageServices','$route','$location','$timeout',function($scope,$routeParams,pageServices,$route,$location,$timeout){
		//console.log($routeParams);

		//$scope.text = $routeParams.type;

		$scope.title = '';
		//$scope.data =[{id:1},{id:2},{id:3}];
		$scope.data = '';
		$scope.total = '';//总共几条记录
		$scope.totalPage = '';//总共几页
		$scope.count = 5;//页记录数
		$scope.status = $routeParams.type;
		$scope.page = 1;
		//console.log($scope.status);
		$scope.load = true;
		$scope.detail = false;
		$scope.detailData = '';
		function ajax(start,cbFn){
			console.log($routeParams);

			var type = $routeParams.type;
			var id = $routeParams.id;
			var url = '';
			if(!id){
				url = '//api.douban.com/v2/movie/'+ type;
				$scope.detail = false;//不展示详情展示列表
			}else {
				url = '//api.douban.com/v2/movie/'+ 'subject/'+ id;
				$scope.detail = true;//只是展示详情
			}
			var parames = {
				//url : '//api.douban.com/v2/movie/'+ 'subject/4920389',
				url : url,
				data : {
					"start" : start,
					"count" : $scope.count
				},
				cbKey : 'callback',
				cbVal : 'cb',
				callback : cbFn
			};
			return parames;
		}

		$scope.$location = $location;
		$scope.numBtn = [];

		$scope.$watch('$location.path()',function(now){
			$scope.page = $routeParams.page;
			$scope.$http = pageServices.$http(
				ajax((($routeParams.page - 1) * $scope.count),
					function(res){
						console.log(res);
						$scope.detailData = res;
						if(!res){
							return
						}
						var res = res;

						$scope.load = false;
						$scope.total = res.total;
						$scope.title = res.title;
						$scope.totalPage = Math.ceil(res.total / $scope.count);
						$scope.data = res.subjects;

						var pageNum = $routeParams.page;

						/*刷新分页数字*/
						if(pageNum <= Math.ceil( $scope.count / 2) ){//1 2 3
							$scope.numBtn = [];
							for(var i = 0; i < $scope.count ; i++){
								$scope.numBtn.push(i + 1);
							}
						}
						else if( pageNum > ($scope.totalPage - Math.floor($scope.count / 2) )){
							$scope.numBtn = [];
							for(var i = 0; i < $scope.count ; i++){
								$scope.numBtn.push(i + $scope.totalPage - $scope.count + 1);
							}
							//console.log($scope.numBtn);
							$timeout(function(){
								$scope.numBtn = [];
								for(var i = 0; i < $scope.count ; i++){
									$scope.numBtn.push(i + $scope.totalPage - $scope.count + 1);
								}
							},100)
						}else{
							$scope.numBtn = [];
							for(var i = 0; i < $scope.count ; i++){
								$scope.numBtn.push(pageNum - Math.floor($scope.count / 2) + i);
							}
							//console.log($scope.numBtn);
						}

						$scope.$apply();
					}
				)
			);
		});

		/*左右分页按钮*/
		$scope.checkPage = function(num){
			var page = $routeParams.page;
			var type = $routeParams.type;
			var num = num;

			if(num){//next
				page++;
				if(page > $scope.totalPage){
					page = $scope.totalPage;
				}
				$route.updateParams({page : page,type:type});
			}else {//0 prev
				page--;
				if(page <= 1){
					page = 1;
				}
				$route.updateParams({page : page,type:type});
			}
			//pageServices.$http(
			//	ajax(((page - 1) * $scope.count),
			//		$scope.count,
			//		function(res){
			//			//0 -->prev 1--->next
			//
			//			//console.log(num);
			//			console.log('页数 ：' + page);
			//			console.log('start : ' +((page - 1) * $scope.count));
			//			$scope.page = page;
			//			var res = res;
			//			$scope.total = res.total;
			//			$scope.title = res.title;
			//			$scope.data = res.subjects;
			//			$scope.$apply();
			//		}
			//	))
		};

		//分页按钮
		$scope.pageNum = function(pageNum){
			var type = $routeParams.type;
			$route.updateParams({page : pageNum ,type:type});
		};

		$scope.id = 0;
		$scope.toDetail = function(id){
			$scope.id = id;
			console.log($routeParams)
			var page = $routeParams.page;
			var type = $routeParams.type;
			console.log($scope.id);
			$route.updateParams({page : page ,type:type, id : $scope.id});
		}


	}]);
})(angular);


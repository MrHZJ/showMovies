/**
 * Created by zhijun on 2018/4/6.
 */
(function(angular){
	'use strict';

	angular.module('loadPage.service',[])
	.service('pageServices',['$document','$window',function($document,$window){
		/*
		*option异步交互参数
		* @parmas {string } url 服务器域名地址
		* @parmas {jsonObject } data 传递的参数
		* @parmas {string } cbkey 回调函数参数名字
		* @parmas {string } cbVal 回调函数名字
		* @parmas {string } url 服务器域名地址
		*
		*/
		this.$http = function(option){
			var option = option || {},
				url = (option.url.indexOf('?') === -1 ? (option.url + '?') : ''),
				data = option.data || {},
				cbkey = option.cbkey || 'callback',//规定回调函数的参数名称
				callback = option.callback || function(){},//规定回调函数的参数名称
				cbVal = option.cbVal + '_'+new Date().getTime() || 'callback_'+new Date().getTime(); //回调函数的名称

			var  document = $document[0];
			var oScript = document.createElement('script');

			for(var key in data){
				url += key +'='+ data[key] +'&';
			}

			oScript.src = url + cbkey + '=' +cbVal ;
			document.body.appendChild(oScript);

			$window[cbVal] = callback;
		}

	}]);

})(angular);


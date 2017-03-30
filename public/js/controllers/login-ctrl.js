(function(){
	var app = angular.module('peekus.login-ctrl', ['peekus.login-factory']);

	app.controller('LoginCtrl', function($rootScope, $scope, LoginFactory, $http){

		$scope.credentials = {};
	    $scope.userData = {};
	    $scope.wrongEmail = false;
	    $scope.wrongPassword = false;

		$scope.userLocalLogin = function () {

		   	LoginFactory.localLogin($scope.credentials).then(function(response){
		   		console.log(response[0]);
		   		if(response[0] === "No User Found"){
		   			$scope.wrongEmail = true;
		   		} else if (response[0] === "Invalid Password"){
		   			$scope.wrongPassword = true;
		   		} else {
		   			$scope.userData = response;
		   			$scope.wrongEmail = false;
	    			$scope.wrongPassword = false;
		   		}
		   		
		   	})
		   	.catch(function(response){
		   		console.log("error");
		   	});
		}
	});

}());


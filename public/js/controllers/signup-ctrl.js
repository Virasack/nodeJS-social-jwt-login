(function(){
	var app = angular.module('peekus.signup-ctrl', ['peekus.signup-factory']);

	app.controller('SignUpCtrl', function($rootScope, $scope, SignUpFactory, $http){

		$scope.signUpCredentials = {};
		$scope.badEmail = false;
	   

	    $scope.userLocalSignUp = function () {

		   	SignUpFactory.localSignUp($scope.signUpCredentials).then(function(response){
		   		console.log(response[0]);
		   		if(response[0] === "That email already taken"){
		   			$scope.badEmail = true;
		   		} else {
		   			$scope.userData = response;
		   			$scope.badEmail = false;
		   		}
		   		
		   	})
		   	.catch(function(response){
		   		console.log("error");
		   	});
		}

		
	});

}());


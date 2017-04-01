(function(){
	var app = angular.module('peekus.signup-ctrl', ['peekus.signup-factory', 'ui.bootstrap']);

	app.controller('SignUpCtrl', function($rootScope, $scope, SignUpFactory, $http, $uibModalInstance){

		$scope.signUpCredentials = {};
		$scope.badEmail = false;
		$rootScope.successSignUp = false;
	   

	    $scope.userLocalSignUp = function () {

	    	console.log($scope.signUpCredentials);
		   	SignUpFactory.localSignUp($scope.signUpCredentials).then(function(response){
		   		console.log(response[0]);
		   		if(response[0] === "That email already taken"){
		   			$scope.badEmail = true;
		   		} else {
		   			$scope.userData = response;
		   			$scope.badEmail = false;
		   			$rootScope.successSignUp = true;
		   			$uibModalInstance.dismiss('cancel');
		   		}
		   		
		   	})
		   	.catch(function(response){
		   		console.log("error");
		   	});
		}

		$scope.closeSignUpModal = function() {
	    	$uibModalInstance.dismiss('cancel');
	  	};

		
	});

}());


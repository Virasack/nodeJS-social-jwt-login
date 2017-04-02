(function(){
	var app = angular.module('peekus.login-ctrl', ['peekus.login-factory','ui.bootstrap','peekus.signup-ctrl']);

	app.controller('LoginCtrl', function($rootScope, $scope, LoginFactory, $http, $log, $uibModal, $state){

		$scope.credentials = {};
	    $scope.userData = {};
	    $scope.wrongEmail = false;
	    $scope.wrongPassword = false;
	    localStorage.setItem("LoggedIn", false);

	    $scope.openSignUpModal = function() {
	      	var modalInstance = $uibModal.open({
	          templateUrl: './templates/signup-modal.html',
	          controller: 'SignUpCtrl'
	        });
    	};

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
	    			var loggedIn = true;
            		localStorage.setItem("LoggedIn", loggedIn);
	    			$state.go('profile');
		   		}
		   		
		   	})
		   	.catch(function(response){
		   		console.log("error");
		   	});
		}
	});

}());


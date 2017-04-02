(function(){
	var app = angular.module('peekus.profile-ctrl', []);

	app.controller('ProfileCtrl', function($rootScope, $scope, $state){

		$scope.logout = function() {
	    	localStorage.removeItem('LoggedIn');
	    	$state.go('login');
	  	};

	});

}());
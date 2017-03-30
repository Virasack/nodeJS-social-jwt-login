(function(){
var app = angular.module('peekus.login-factory', []);



app.factory('LoginFactory', function($http){


   return {
        localLogin : function(credentials) {
			return $http({
					method : 'POST',
					url : '/auth/login',
					data : 'email='+credentials.email+'&password='+credentials.password,
					headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
				})
				.then(function(response){				
          			return response.data;
				})
				.catch(function(response){
					console.log('error ' + response);
				});
			}
        

    };



});
}());

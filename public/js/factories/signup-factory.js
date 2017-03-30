(function(){
var app = angular.module('peekus.signup-factory', []);



app.factory('SignUpFactory', function($http){


   return {
        localSignUp: function(credentials) {
			return $http({
					method : 'POST',
					url : '/auth/signup',
					data : 'email='+credentials.email+'&password='+credentials.password,
					headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
				})
				.then(function(response){	
					console.log(response.data);			
          			return response.data;
				})
				.catch(function(response){
					console.log('error ' + response);
				});
			}
        

    };



});
}());

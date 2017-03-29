
(function(){
  var app = angular.module('peekus', ['ngRoute']);

  app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){
    
    $routeProvider.when('/', {
      templateUrl: 'templates/login.html'
    });



    $routeProvider.when('/profile', {
       templateUrl: 'templates/profile.html'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });


  }]);

}());

(function(){
  var app = angular.module('peekus', ['ngRoute' ,'peekus.login-ctrl', 'peekus.login-factory', 'peekus.signup-ctrl','peekus.signup-factory']);

  app.config(function($routeProvider, $locationProvider){
    
    $locationProvider.hashPrefix('');

    $routeProvider
    .when('/', {
      templateUrl: './templates/login.html',
      controller:'LoginCtrl'
    })
    .when('/signup', {
       templateUrl: './templates/signup.html',
       controller:'SignUpCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });


  });

}());


(function(){
  var app = angular.module('peekus', ['peekus.profile-ctrl', 'ui.router', 'ngRoute','peekus.login-ctrl', 'peekus.login-factory', 'peekus.signup-ctrl','peekus.signup-factory', 'ui.bootstrap']);

  // app.config(function($routeProvider, $locationProvider){
    
  //   $locationProvider.hashPrefix('');

  //   $routeProvider
  //   .when('/', {
  //     templateUrl: './templates/login.html',
  //     controller:'LoginCtrl'
  //   })
  //   .when('/signup', {
  //      templateUrl: './templates/signup.html',
  //      controller:'SignUpCtrl'
  //   })
  //   .otherwise({
  //     redirectTo: '/'
  //   });


  // });

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.hashPrefix('');
  
    $stateProvider.state('login', {
        url :'/login',
        templateUrl: 'templates/login.html',
        controller:'LoginCtrl'
    });

    $stateProvider.state('signup', {
        url :'/signup',
        templateUrl: 'templates/signup.html',
        controller:'SignUpCtrl'
    }); 

    $stateProvider.state('profile', {
        url :'/',
        templateUrl: 'templates/profile.html',
        controller:'ProfileCtrl',
        cache:false
    });   

    $urlRouterProvider.otherwise('/');
});

app.run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {
        //When the app is opened, we check if the User is already logged.
        //If not, we redirect him to the Login page
        console.log(toState);
        var log = false;
        log = localStorage.getItem('LoggedIn');
        if (log !== 'true' && toState.name !== 'login'){
          event.preventDefault();
          $state.go('login');
        } 

   });
});

}());


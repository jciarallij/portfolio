var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngCookies']);
var apiUrl = 'http://localhost:4000';


portfolioApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    }).otherwise({
        redirectTo: '/'
    });
});


portfolioApp.controller('mainController', function($scope) {
    console.log('this is the main controller.');
});


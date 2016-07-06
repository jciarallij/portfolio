var portfolioApp = angular.module('portfolioApp', ['ngRoute', 'ngCookies', 'ngAnimate']);

portfolioApp.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function() {
                    // alert('image exist');
                }).error(function() {
                    // alert('image not exist');
                    element.attr('src', 'img/placeholder2.jpg'); // set default image
                });
            });
        }
    };
});



portfolioApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html'
    }).otherwise({
        redirectTo: '/'
    });
});


portfolioApp.controller('mainController', function($scope, $http, $routeParams, $interval, $location) {


    $scope.emailFunc = function() {
        console.log($scope.name);
        $http({
            method: "post",
            url: "mail.php",
            dataType: 'json',
            data: {
                name: $scope.name,
                emailAddr: $scope.emailAddr,
                emailSubject: $scope.emailSubject,
                emailBody: $scope.emailBody
            }

        }).then(
            function(success) {
                console.log(success);
                $scope.emailAddr = "";
                $scope.emailBody = "";
                $scope.emailSubject = "";
                $scope.name = "";
                console.log("Email Sent!");
            },
            function(error) {
                console.log(error);
            });
    };



});

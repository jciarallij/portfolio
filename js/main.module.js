var portfolioApp = angular.module('portfolioApp', ['ngRoute']);

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

    console.log("Ciaralli.com Controller has loaded!");
    $scope.name = "";

    $scope.ticket = false;
    $scope.projectTicket = true;

    $scope.twitter = false;
    $scope.projectTwitter = true;

    $scope.blackjack = false;
    $scope.projectBlackjack = true;

    $scope.dollar = false;
    $scope.projectDollar = true;

    $scope.mygrub = false;
    $scope.projectMygrub = true;

    $scope.roast = false;
    $scope.projectRoast = true;


    $scope.emailFunc = function() {
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


    $scope.showProject = function(project) {
        if (project === 1) {
            $scope.ticket = true;
            $scope.projectTicket = false;
        } else if (project === 2) {
            $scope.twitter = true;
            $scope.projectTwitter = false;
        } else if (project === 3) {
            $scope.blackjack = true;
            $scope.projectBlackjack = false;
        } else if (project === 4) {
            $scope.dollar = true;
            $scope.projectDollar = false;
        } else if (project === 5) {
            $scope.mygrub = true;
            $scope.projectMygrub = false;
        } else if (project === 6) {
            $scope.roast = true;
            $scope.projectRoast = false;
        }


    };

});

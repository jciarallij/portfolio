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
var apiUrl = 'http://localhost:4000';


portfolioApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html'
    }).otherwise({
        redirectTo: '/'
    });
});


portfolioApp.controller('mainController', function($scope, $http, $routeParams, $interval, $location) {

    console.log('this is the main controller.');
    var myTweets = '/build';
    if ('page' in $routeParams) {
        myTweets = $routeParams.page;
        console.log(myTweets);
    }

    $scope.header = "test";
    $scope.changeHeader = function(name) {
        $scope.header = name;
    };


    $scope.nextId = function(id) {
        console.log(id);
        $location.path("#/" + id);
    };
    // var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?user=true&hash=lolesports&secondHash=';
    var url = 'http://www.digitalcrafts.com/students/twitter/hashtag.php?user=true&hash=jciarallij&secondHash=';
    $http.get(url).success(function(data) {
        $scope.data = data.statuses;
        for (i = 0; i < $scope.data.length; i++) {
            console.log($scope.data[i].user.profile_banner_url);
            if ($scope.data[i].user.profile_banner_url === undefined) {

                $scope.data[i].user.profile_banner_url = 'img/placeholder.jpg';
            }

            var time = $scope.data[i].created_at;
            var tweetTime = new Date(time);
            $scope.data[i].tweetSeconds = tweetTime.getTime() / 1000;
        }






        $interval(function() {
            for (i = 0; i < $scope.data.length; i++) {
                var currentDate = new Date();
                var currentTimeInSeconds = currentDate.getTime() / 1000;
                currentTime = currentTimeInSeconds;
                tweetTime = $scope.data[i].tweetSeconds;
                var timeDiff = currentTime - tweetTime;
                if (timeDiff > 86400) {
                    currentTime = currentTimeInSeconds / 86400;
                    tweetTime = $scope.data[i].tweetSeconds / 86400;
                    timeStamp = " days ";
                } else if (timeDiff > 3600) {
                    currentTime = currentTimeInSeconds / 3600;
                    tweetTime = $scope.data[i].tweetSeconds / 3600;
                    timeStamp = " hours ";
                } else if (timeDiff > 60) {
                    currentTime = currentTimeInSeconds / 60;
                    tweetTime = $scope.data[i].tweetSeconds / 60;
                    timeStamp = " mintues ";
                } else {
                    timeStamp = " seconds ";
                }
                $scope.data[i].sinceTweeted = Math.floor(currentTime - tweetTime) + timeStamp + "ago";
            }

        }, 1000);



    });

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
            },
            function(error) {
                console.log(error);
            });
    };



});

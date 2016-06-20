slantApp.controller('MainController', ['$scope', '$http', '$mdSidenav', '$filter', function($scope, $http, $mdSidenav, $filter) {
    console.log('Maincontroller is running');
    $scope.search = '';
    $scope.showcount = false;
    $scope.sortBy = 'Retweets';
    // $scope.filterText = ''

    $scope.toggleNav = function() {
        $mdSidenav('left').toggle();
    }

    $scope.getTweets = function() {
        $scope.loading = true;
        $scope.showcount = false;
        $http.post('/twit/' + $scope.search)
            .then(function(response) {
                $scope.loading = false;
                $scope.showcount = true;
                $scope.tweets = response.data.data.statuses;
                for (var i = 0; i < $scope.tweets.length; i++) {
                    // $scope.tweets[i].filterText = $filter('filter')($scope.tweets[i], !{text: 'https://t.co'});
                    $scope.tweets[i].score = response.data.score.score[i];
                    $scope.tweets[i].sentiment = response.data.score.sentiment[i];
                    $scope.tweets[i].rawSentiment = response.data.score.rawSentiment[i];
                }
                console.log($scope.tweets);
                $scope.countTweets();

            })
    }

    $scope.countTweets = function() {
        $scope.posTotal = 0;
        $scope.negTotal = 0;
        $scope.neuTotal = 0;
        $scope.senTotal = 0;
        for (var i = 0; i < $scope.tweets.length; i++) {
            $scope.senTotal += (parseInt($scope.tweets[i].rawSentiment));
            if ($scope.tweets[i].score == 'Positive' || $scope.tweets[i].score == "Very Positive") {
                $scope.posTotal++;
            } else if ($scope.tweets[i].score == 'Negative' || $scope.tweets[i].score == "Very Negative") {
                $scope.negTotal++;
            } else {
                $scope.neuTotal++;
            }
        }
    };

}]);

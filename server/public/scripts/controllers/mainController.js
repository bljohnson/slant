slantApp.controller('MainController', ['$scope', '$http', function($scope, $http) {

    var username = '87086b6f-cc96-4eb1-a10e-dbf888c42d9a'
    var key = 'vHK4TVaXfd';
    var baseURL = '';

    $scope.getTweets = function() {
      var query = 'pancakes';


      var request = 'https://87086b6f-cc96-4eb1-a10e-dbf888c42d9a:vHK4TVaXfd@cdeservice.mybluemix.net:443/api/v1/messages/search?q=pancakes' + '&callback=JSON_CALLBACK';

      // var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

      console.log(request);

      $http.jsonp(request).then(
        function(response) {
          console.log(response.data);
        }
      )
    }







}]);

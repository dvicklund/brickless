module.exports = function(app) {
  app.controller('singleItemCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.getItem = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/item/' + id).success(function(response) {
        $scope.item = response;
      });
    };


  }]);
}

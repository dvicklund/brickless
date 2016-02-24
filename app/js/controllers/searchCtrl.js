module.exports = function(app) {
  app.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.items =[];

    $scope.getAllItems = function() {
      $http.get('/item').success(function(response){
        $scope.items = response;
      });
    };

  }]);
}


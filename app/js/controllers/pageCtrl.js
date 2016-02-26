module.exports = function(app) {
  app.controller('PageCtrl', ['$scope', '$location', '$cookies', function($scope, $location, $cookies) {
    $scope.goto = function(path) {
      $location.path(path);
    }

    $scope.logout = function() {
      $location.path('/login');
      $cookies.remove('token');
    }
  }]);
}

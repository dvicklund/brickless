module.exports = function(app) {
  app.controller('PageCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    }
  }]);
}

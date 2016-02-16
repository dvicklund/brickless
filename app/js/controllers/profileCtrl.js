module.exports = function(app) {
  app.controller('ProfileCtrl', ['$scope', '$location', '$http', '$cookies',
    function($scope, $location, $http, $cookies) {
    $scope.currentUser = {};

    $scope.getUser = function() {
      $scope.token = $cookies.get('token');
      $http.defaults.headers.common.token = $scope.token;
      $http.get('/auth/user')
        .then(function(res) {
          $scope.currentUser = res.data;
        }, function(err) {
          console.log(err);
        });
    };

  }]);
}

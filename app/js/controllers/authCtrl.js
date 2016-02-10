module.exports = function(app) {
  app.controller('AuthCtrl', function($scope, $timeout, $http, $cookies, $base64) {

    function isLoggedIn() {
      if($cookies.get('authToken')) return true;
      else return false;
    }

    $scope.authErrors = [];
    $scope.user = {};
    $scope.signup = false;
    $scope.token = null;
    $scope.currrentUser = null;

    $scope.toggleSignup = function() {
      if($scope.signup) $scope.signup = false;
      else {
        $scope.signup = true;
        $scope.authErrors = [];
        $scope.user = {};
      }
    }

    $scope.getUser = function() {
      $scope.token = $cookies.get('authToken');
      $http.defaults.headers.common.token = $scope.token;
      $http.get(SERVER_ADDRESS + '/api/user')
    }
  })
}

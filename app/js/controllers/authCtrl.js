module.exports = function(app) {

  app.controller('AuthCtrl', ['$cookies', '$scope', '$http', '$base64',
    function($rootScope, $scope, $timeout, $location, $http, $cookies, $base64) {

      function isLoggedIn() {
        if ($cookies.get('token'))
          return true;
        else
          return false;
      }

      function checkAuth() {
        if (!(isLoggedIn()))
          $location.path('/login');
      }

      $scope.authErrors = [];
      $scope.user = {};
      $scope.signup = false;
      $scope.token = '';
      $scope.currentUser = null;

      // Switch between signup and login
      $scope.toggleSignup = function() {
        if ($scope.signup)
          $scope.signup = false;
        else
          $scope.signup = true;
        $scope.authErrors = [];
        $scope.user = {};
      };

      $scope.getUser = function() {
        $scope.token = $cookies.get('token');
        $http.defaults.headers.common.token = $scope.token;
        $http.get(SERVER_ADDRESS + '/auth/user')
          .then(function(res) {
            $scope.currentUser = res.data;
          }, function(err) {
            console.log(err);
          });
      };

      $scope.authenticate = function(user) {
        $scope.authErrors = [];

        if (!(user.auth.username && user.auth.password))
          return $scope.authErrors.push('Please enter username and password.');

        if($scope.signup) {
          $http.post(SERVER_ADDRESS + '/auth/signup', user)
            .then(function(res) {
              $cookies.put('token', res.data.token);
              $scope.getUser();
              $scope.user = {};
              $scope.signup = false;
              $location.path('/home');
            }, function(err) {
              $scope.authErrors.push(err.data.msg);
              console.log(err.data);
              $scope.user = {};
            });
        } else {
          $http({
            method: 'POST',
            url: SERVER_ADDRESS + '/auth/signin',
            data: {
              lat: $rootScope.lat,
              lng: $rootScope.lng,
              deviceId: $rootScope.deviceId
            },
            headers: {
              'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
            }
          }).then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUser();
            $scope.user = {};
            $location.path('/home');
          }, function(err) {
            $scope.authErrors.push(err.data.msg);
            console.log(err.data);
            $scope.user = {};
          });
        }
      };

      $scope.logout = function() {
        $scope.currentUser = null;
        $scope.user = {};
        $scope.user.auth = null;
        $scope.signup = false;
        $location.path('/login');
        $cookies.remove('token');
      };
  }]);
};

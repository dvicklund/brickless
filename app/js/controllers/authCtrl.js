var unitedStatesList = require(__dirname + '/../../data/unitedStatesList');

module.exports = function(app) {

  app.controller('AuthCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$cookies', '$base64', '$q',
    function($rootScope, $scope, $timeout, $location, $http, $cookies, $base64, $q) {

      $scope.stateList = unitedStatesList;

      $scope.authErrors = [];
      $scope.user = {};
      $scope.signup = false;
      $scope.token = '';
      $scope.currentUser = null;

      $rootScope.$on('$routeChangeSuccess', function(evt, curr, prev) {
        if (prev &&
            prev.$$route.originalPath === '/profile' &&
            curr.locals.$scope.authErrors &&
            curr.locals.$scope.authErrors.indexOf('Must be logged in to view your account (duh)!') === -1) {
          curr.locals.$scope.authErrors.push('Must be logged in to view your account (duh)!')
        }
      })

      $rootScope.$on('$routeChangeSuccess', function(evt, curr, prev) {
        if (prev &&
            prev.$$route.originalPath === '/post' &&
            curr.locals.$scope.authErrors &&
            curr.locals.$scope.authErrors.indexOf('Must be logged in to post items!') === -1) {
          curr.locals.$scope.authErrors.push('Must be logged in to post items!')
        }
      })

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
        $http.get('/auth/user')
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
          $http.post('/auth/signup', user)
            .then(function(res) {
              $cookies.put('token', res.data.token);
              $scope.getUser();
              $scope.user = {};
              $scope.signup = false;
              $location.path('/');
            }, function(err) {
              $scope.authErrors.push(err.data.msg);
              console.log(err.data);
              $scope.user = {};
            });
        } else {
          $http({
            method: 'POST',
            url: '/auth/signin',
            data: {
              lastLogin: Date.now()
            },
            headers: {
              'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
            }
          }).then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUser();
            $scope.user = {};
            $location.path('/');
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

      $scope.goto = function(path) {
        $location.path(path);
      }
  }]);
};

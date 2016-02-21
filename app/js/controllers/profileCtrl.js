module.exports = function(app) {
  app.controller('ProfileCtrl', ['$scope', '$location', '$http', '$cookies',
    function($scope, $location, $http, $cookies) {
      $scope.currentUser;
      $scope.newNumber = {};
      $scope.upload = false;
      $scope.editingNumber = false;
      $scope.showHide = "Show";
      $scope.errors = [];

      $scope.init = function() {
        if(!$scope.currentUser) $scope.getUser(function(res, err) {
          if(!$scope.currentUser) $location.path('/login');
        });
      }

      $scope.showHideButton = function() {
        $scope.upload = !$scope.upload;
        if($scope.upload) $scope.showHide = 'Hide';
        else $scope.showHide = 'Show';
      }

      $scope.getUser = function(callback) {
        $http.defaults.headers.common.token = $cookies.get('token');
        $http.get('/auth/user')
        .then(function(res) {
          $scope.currentUser = res.data;
          $scope.currentUser.lastLogin = (new Date($scope.currentUser.lastLogin)).toLocaleString();
          callback(res, null);
        }, function(err) {
          console.log(err);
          callback(null, err);
        });
      };

      $scope.updateUser = function(callback) {
        $http.defaults.headers.common.token = $cookies.get('token');
        $http.put('/auth/user', $scope.currentUser)
        .then(function(res) {
          console.log(res);
          callback(res, null);
        }, function(err) {
          callback(null, err);
        })
      }
      
      $scope.editNumber = function() {
        if($scope.editingNumber) {
          $scope.currentUser.phoneNumbers.push({
            name: $scope.newNumber.name,
            number: $scope.newNumber.number
          });
          $scope.updateUser(function(res, err) {
            if(err) $scope.errors.push(err.msg);
            $scope.newNumber = {};
          });
        }
        $scope.editingNumber = !$scope.editingNumber;
      }

      $scope.$on('editEnter', function(e) {
        console.log('editEnter');
        $scope.updateUser(function(res, err) {
          if(err) $scope.errors.push(err.msg);
        })
      })

      $scope.init();
  }]);
}

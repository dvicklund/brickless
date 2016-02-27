module.exports = function(app) {
  app.controller('ProfileCtrl', ['$scope', '$location', '$http', '$cookies',
    function($scope, $location, $http, $cookies) {
      $scope.currentUser;
      $scope.newNumber = {};
      $scope.upload = false;
      $scope.editingNumber = false;
      $scope.showHide = "Show";
      $scope.errors = [];
      $scope.items = [];

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
          $scope.currentUser.items.forEach(function(curr, i, arr) {
            $http.get('/item/' + curr).then(function(res) {
              $scope.items.push(res.data);
              console.log(res.data);
            }, function(err) {
              console.log(err);
            })
          })
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

          if (callback) // THIS IS A HACK - I added this so I could call it from profile.html
            callback(res, null);

        }, function(err) {

          if (callback) // THIS IS A HACK - same as above.
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

      $scope.deleteNumber = function(num) {
        $scope.currentUser.phoneNumbers.splice($scope.currentUser.phoneNumbers.indexOf(num), 1);
        $scope.updateUser(function(req, err) {
          if(err) $scope.errors.push(err.msg);
        })
      }

      $scope.$on('editEnter', function(e) {
        $scope.updateUser(function(res, err) {
          if(err) $scope.errors.push(err.msg);
        })
      })

      $scope.$on('phoneEnter', function(e) {
        $scope.editNumber();
      })

      $scope.init();
  }]);
}

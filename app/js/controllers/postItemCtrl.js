module.exports = function(app) {
  app.controller('postItemCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {

    $scope.call = {
      val: 'yes'
    };

   //auth checks copied from profileCTRL.js
    $scope.init = function() {
      if(!$scope.currentUser) $scope.getUser(function(res, err) {
        if(!$scope.currentUser) $location.path('/login');
      });
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
    $scope.init();

    $scope.submitForm = function(newItem){
      newItem.sellerUserName = $scope.currentUser.username;
      console.log(newItem);

      $http.post('/item', newItem)
      .success(function (data, status, headers, config){
        console.log('success' + data);
        })

    };

  }]);
}


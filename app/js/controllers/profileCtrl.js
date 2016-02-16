module.exports = function(app) {
  app.controller('ProfileCtrl', ['$scope', '$location', '$http', '$cookies',
    function($scope, $location, $http, $cookies) {
    $scope.currentUser;
    $scope.upload = false;
    $scope.showHide = "Show";

    $scope.init = function() {
      if(!$scope.currentUser) $scope.getUser();
    }

    $scope.showHideButton = function() {
      $scope.upload = !$scope.upload;
      if($scope.upload) $scope.showHide = 'Hide';
      else $scope.showHide = 'Show';
    }

    $scope.getUser = function() {
      $http.defaults.headers.common.token = $cookies.get('token');
      $http.get('/auth/user')
      .then(function(res) {
        $scope.currentUser = res.data;
        $scope.currentUser.lastLogin = (new Date($scope.currentUser.lastLogin)).toLocaleString();
      }, function(err) {
        console.log(err);
      });
    };

    $scope.init();
  }]);
}

module.exports = function(app) {
  app.controller('postItemCtrl', function($scope, $location, $http) {

    $scope.call = {
      val: 'yes'
    };

  });
}

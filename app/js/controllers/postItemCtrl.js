module.exports = function(app) {
  app.controller('postItemCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

    $scope.call = {
      val: 'yes'
    };

    $scope.submitForm = function(newItem){


      console.log(newItem);
      $http.post('/item', newItem)
      .success(function (data, status, headers, config){
        console.log('success' + data);
        })



    };

  }]);
}


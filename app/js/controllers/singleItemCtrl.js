module.exports = function(app) {
  app.controller('singleItemCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.item = {};


    $scope.getItem = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      var today = new Date;
      $http.get('/item/' + id).success(function(response) {
        $scope.item = response;
        user = $scope.item.sellerUserName;

        //for "Posted X days ago"
        var oneDay = 24*60*60*1000;
        var fixDate = Date.parse($scope.item.postDate);
        var daysAgo = Math.round(Math.abs((today.getTime() - fixDate)/(oneDay)));
        $scope.countDays = daysAgo;

        // image
        $scope.showPhoto = $scope.item.morePhotos[0];

        // average response time needs to be built out, but it's not relevent now.
      });
    };



  }]);
}

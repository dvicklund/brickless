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

        // other items doesn't include this one, items for sale should be total items
        $scope.itemsForSale = $scope.item.sellerOtherItems + 1;

        // will list 0 if no previous transactions are logged
        $scope.transactions = 0 + $scope.item.sellerTransHistory;
        var oneDay = 24*60*60*1000;
        var fixDate = Date.parse($scope.item.postDate);
        console.log(fixDate);
        var daysAgo = Math.round(Math.abs((today.getTime() - fixDate)/(oneDay)));
        // response time needs to be built out, but it's not relevent now.
        $scope.countDays = daysAgo;
      });
    };



  }]);
}

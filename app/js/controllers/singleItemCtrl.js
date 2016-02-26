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

        // other items doesn't include this one, items for sale should be total items
        $scope.itemsForSale = $scope.item.sellerOtherItems + 1;

        // will list 0 if no previous transactions are logged
        $scope.transactions = 0 + $scope.item.sellerTransHistory;

        // The postDate is NaN, convert or change input format?
        // var daysAgo = today - $scope.item.postDate;

        // response time needs to be built out, but it's not relevent now.
        console.log($scope.item.morePhotos[0]);

      });
    };
  }]);
}

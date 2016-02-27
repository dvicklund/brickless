module.exports = function(app) {
  app.controller('searchCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.items =[];
    $scope.keywords = '';
    $scope.minPrice = 0;
    $scope.maxPrice = 0;
    // sorting still not working
    $scope.sortViewOptions = [
      {name: 'Date old - new', value: 'postDate'},
      // {name: 'Date old - new', value: '"postDate"  : !reverse'},
      {name: 'Price', value: 'askingPrice'},
      // {name: 'Price', value: '"askingPrice" : reverse'}
    ];
    $scope.sortView = $scope.sortViewOptions[0];

    $scope.getItems = function() {

    	var path = '/item?';

		path += 'q=' + $scope.keywords;
		path += '&min=' + $scope.minPrice;

		if ($scope.maxPrice != 0) path += 'max=' + $scope.maxPrice;

    	$http.get(path).success(function(response) {
    		$scope.items = response;
    	});
    };

    $scope.sort = function(option) {

    }

    $scope.getAllItems = function() {
      $http.get('/item').success(function(response){
        $scope.items = response;
      });
    };

  }]);
}

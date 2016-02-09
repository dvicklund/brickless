var app = angular.module('bricks', [
  'ngRoute'
]);

require('./controllers/controllers')(app);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "html/login.html",
    controller: "PageCtrl"
  })
  .when('/shop', {
    templateUrl: 'html/shop.html',
    controller: 'PageCtrl'
  })
  // .when('/pickups', {
  //   templateUrl: 'html/pickups.html',
  //   controller: 'PickupCtrl'
  // })
  // .when('/account', {
  //   templateUrl: 'html/account.html',
  //   controller: 'AccountCtrl'
  // })
  // .when('/cart', {
  //   templateUrl: 'html/cart.html',
  //   controller: 'CartCtrl'
  // })
}])

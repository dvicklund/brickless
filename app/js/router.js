module.exports = function(app) {
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
    .when('/post', {
      templateUrl: 'html/post.html',
      controller: 'PageCtrl'
    })
    .when('/post-view', {
      // /postid ???
      templateUrl: 'html/post-view.html',
      controller: 'PageCtrl'
    })
    // TODO: Controllers
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
  }]);
};

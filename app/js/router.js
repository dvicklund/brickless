module.exports = function(app) {
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'html/home.html',
      controller: 'PageCtrl'
    })
    .when('/login', {
      templateUrl: "html/login.html",
      controller: "AuthCtrl"
    })
    .when('/shop', {
      templateUrl: 'html/store.html',
      controller: 'StoreCtrl'
    })
    .when('/post', {
      templateUrl: 'html/post.html',
      controller: 'postItemCtrl'
    })
    .when('/post-view', {
      // /postid ???
      templateUrl: 'html/post-view.html',
      controller: 'PageCtrl'
    })
    .when('/results', {
      // search results id/url?
      templateUrl: 'html/search-results.html',
      controller: 'searchCtrl'
    })
    .when('/profile', {
      templateUrl: 'html/profile.html',
      controller: 'ProfileCtrl'
    })
    .when('/imageupload', {
      templateUrl: 'html/imageupload.html',
      controller: 'imageuploadCtrl'
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

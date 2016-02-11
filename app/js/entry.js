require('angular-route');
require('angular-cookies');
require('angular-base64');

var app = angular.module('bricks', [
  'ngRoute',
  'ngCookies',
  'base64'
]);

require('./controllers/controllers')(app);
require('./directives/directives')(app);
require('./router')(app);

require('angular-route');
require('angular-cookies');
require('angular-base64');
require('ng-file-upload');

var app = angular.module('bricks', [
  'ngRoute',
  'ngCookies',
  'base64',
  'ngFileUpload'
]);

require('./controllers/controllers')(app);
require('./directives/directives')(app);
require('./router')(app);

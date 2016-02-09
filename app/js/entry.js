var app = angular.module('bricks', [
  'ngRoute'
]);

require('./controllers/controllers')(app);
require('./directives/directives')(app);
require('./router')(app);

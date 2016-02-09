module.exports = function(app) {
  app.directive('header', function() {
    return {
      restrict: 'C',
      replace: true,
      templateUrl: 'html/header.html'
    }
  });
}

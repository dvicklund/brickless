module.exports = function(app) {
  app.directive('imageupload', function() {
    return {
      restrict: 'C',
      replace: true,
      templateUrl: 'html/imageupload.html'
    }
  });
}

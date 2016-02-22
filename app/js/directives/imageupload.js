module.exports = function(app) {
  app.directive('imageupload', function() {
    return {
      restrict: 'C',
      replace: false,
      templateUrl: 'html/imageupload.html'
    }
  });
}

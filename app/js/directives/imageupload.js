module.exports = function(app) {
  app.directive('imageupload', function() {
    return {
      restrict: 'C',
      replace: true,
      controller: 'js/controllers/imageuploadCtrl.js',
      templateUrl: 'html/imageupload.html'
    }
  })
}

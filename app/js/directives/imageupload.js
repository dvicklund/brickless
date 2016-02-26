module.exports = function(app) {
  app.directive('imageupload', function() {
		
		var controller = ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
		    $scope.uploadPic = function(file) {
		      file.upload = Upload.upload({
		        url: '/img/upload',
		        data: {file: file, username: $scope.username},
		      });

		      file.upload.then(function (response) {
		        $timeout(function () {

		          console.log(response.data.path);
		          $scope.image = response.data.path;
		          $scope.newItem.displayPhoto = response.data.path;

		        });
		      }, function (response) {
		        if (response.status > 0)
		          $scope.errorMsg = response.status + ': ' + response.data;
		      }, function (evt) {
		        // Math.min is to fix IE which reports 200% sometimes
		        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		      });
		    }
		  }];

    return {
      restrict: 'E', // was C
      replace: true,
      controller: controller,
      templateUrl: 'html/imageupload.html'
    };
  });
};

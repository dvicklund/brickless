module.exports = function(app) {
  app.directive('contenteditable', function($rootScope) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        function read() {
          ngModel.$setViewValue(element.html());
        }

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "");
        }

        element.bind('blur keyup change', function() {
          scope.$apply(read);
        })

        element.bind('keydown', function(e) {
          if(e.keyCode === 13) {
            e.preventDefault();
            $rootScope.$broadcast('editEnter');
          }
        })
      }
    }
  })
}

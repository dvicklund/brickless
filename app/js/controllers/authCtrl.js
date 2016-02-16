module.exports = function(app) {

  app.controller('AuthCtrl', ['$rootScope', '$scope', '$timeout', '$location', '$http', '$cookies', '$base64',
    function($rootScope, $scope, $timeout, $location, $http, $cookies, $base64) {
      function isLoggedIn() {
        if ($cookies.get('token'))
          return true;
        else
          return false;
      }

      function checkAuth() {
        if (!(isLoggedIn()))
          $location.path('/login');
      }

      $scope.stateList = [
        { name: 'ALABAMA', abbr: 'AL'},
        { name: 'ALASKA', abbr: 'AK'},
        { name: 'AMERICAN SAMOA', abbr: 'AS'},
        { name: 'ARIZONA', abbr: 'AZ'},
        { name: 'ARKANSAS', abbr: 'AR'},
        { name: 'CALIFORNIA', abbr: 'CA'},
        { name: 'COLORADO', abbr: 'CO'},
        { name: 'CONNECTICUT', abbr: 'CT'},
        { name: 'DELAWARE', abbr: 'DE'},
        { name: 'DISTRICT OF COLUMBIA', abbr: 'DC'},
        { name: 'FEDERATED STATES OF MICRONESIA', abbr: 'FM'},
        { name: 'FLORIDA', abbr: 'FL'},
        { name: 'GEORGIA', abbr: 'GA'},
        { name: 'GUAM', abbr: 'GU'},
        { name: 'HAWAII', abbr: 'HI'},
        { name: 'IDAHO', abbr: 'ID'},
        { name: 'ILLINOIS', abbr: 'IL'},
        { name: 'INDIANA', abbr: 'IN'},
        { name: 'IOWA', abbr: 'IA'},
        { name: 'KANSAS', abbr: 'KS'},
        { name: 'KENTUCKY', abbr: 'KY'},
        { name: 'LOUISIANA', abbr: 'LA'},
        { name: 'MAINE', abbr: 'ME'},
        { name: 'MARSHALL ISLANDS', abbr: 'MH'},
        { name: 'MARYLAND', abbr: 'MD'},
        { name: 'MASSACHUSETTS', abbr: 'MA'},
        { name: 'MICHIGAN', abbr: 'MI'},
        { name: 'MINNESOTA', abbr: 'MN'},
        { name: 'MISSISSIPPI', abbr: 'MS'},
        { name: 'MISSOURI', abbr: 'MO'},
        { name: 'MONTANA', abbr: 'MT'},
        { name: 'NEBRASKA', abbr: 'NE'},
        { name: 'NEVADA', abbr: 'NV'},
        { name: 'NEW HAMPSHIRE', abbr: 'NH'},
        { name: 'NEW JERSEY', abbr: 'NJ'},
        { name: 'NEW MEXICO', abbr: 'NM'},
        { name: 'NEW YORK', abbr: 'NY'},
        { name: 'NORTH CAROLINA', abbr: 'NC'},
        { name: 'NORTH DAKOTA', abbr: 'ND'},
        { name: 'NORTHERN MARIANA ISLANDS', abbr: 'MP'},
        { name: 'OHIO', abbr: 'OH'},
        { name: 'OKLAHOMA', abbr: 'OK'},
        { name: 'OREGON', abbr: 'OR'},
        { name: 'PALAU', abbr: 'PW'},
        { name: 'PENNSYLVANIA', abbr: 'PA'},
        { name: 'PUERTO RICO', abbr: 'PR'},
        { name: 'RHODE ISLAND', abbr: 'RI'},
        { name: 'SOUTH CAROLINA', abbr: 'SC'},
        { name: 'SOUTH DAKOTA', abbr: 'SD'},
        { name: 'TENNESSEE', abbr: 'TN'},
        { name: 'TEXAS', abbr: 'TX'},
        { name: 'UTAH', abbr: 'UT'},
        { name: 'VERMONT', abbr: 'VT'},
        { name: 'VIRGIN ISLANDS', abbr: 'VI'},
        { name: 'VIRGINIA', abbr: 'VA'},
        { name: 'WASHINGTON', abbr: 'WA'},
        { name: 'WEST VIRGINIA', abbr: 'WV'},
        { name: 'WISCONSIN', abbr: 'WI'},
        { name: 'WYOMING', abbr: 'WY' }
      ];

      $scope.authErrors = [];
      $scope.user = {};
      $scope.signup = false;
      $scope.token = '';
      $scope.currentUser = null;

      // Switch between signup and login
      $scope.toggleSignup = function() {
        if ($scope.signup)
          $scope.signup = false;
        else
          $scope.signup = true;
        $scope.authErrors = [];
        $scope.user = {};
      };

      $scope.getUser = function() {
        $scope.token = $cookies.get('token');
        $http.defaults.headers.common.token = $scope.token;
        $http.get('/auth/user')
          .then(function(res) {
            $scope.currentUser = res.data;
          }, function(err) {
            console.log(err);
          });
      };

      $scope.authenticate = function(user) {
        $scope.authErrors = [];

        if (!(user.auth.username && user.auth.password))
          return $scope.authErrors.push('Please enter username and password.');

        if($scope.signup) {
          $http.post('/auth/signup', user)
            .then(function(res) {
              $cookies.put('token', res.data.token);
              $scope.getUser();
              $scope.user = {};
              $scope.signup = false;
              $location.path('/home');
            }, function(err) {
              $scope.authErrors.push(err.data.msg);
              console.log(err.data);
              $scope.user = {};
            });
        } else {
          $http({
            method: 'POST',
            url: '/auth/signin',
            data: {
              lastLogin: Date.now()
            },
            headers: {
              'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
            }
          }).then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUser();
            $scope.user = {};
            $location.path('/home');
          }, function(err) {
            $scope.authErrors.push(err.data.msg);
            console.log(err.data);
            $scope.user = {};
          });
        }
      };

      $scope.logout = function() {
        $scope.currentUser = null;
        $scope.user = {};
        $scope.user.auth = null;
        $scope.signup = false;
        $location.path('/login');
        $cookies.remove('token');
      };
  }]);
};

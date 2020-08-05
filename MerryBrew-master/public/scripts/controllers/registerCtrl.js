angular.module('registerCtrl', [])

  .controller('registerController', function ($scope, $http, authService, $location) {

    $scope.passwordRegexValidation = function () {
      let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      $scope.validationTest = regex.test($scope.registerForm.password);

    }

    $scope.register = function () {

      // initial values
      $scope.showRegistrationFailedAlert = false;
      $scope.showRegistrationFailedAlertPassword = false;
      $scope.disabled = true;

      //Check password is the correct strength
      $scope.passwordRegexValidation()

      if (!$scope.validationTest) {
        $scope.showRegistrationFailedAlertPassword = true;
        return
      }


      // call register from service
      authService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success



        .then(function () {
          $scope.disabled = false;
          $scope.registerForm = {};
          $location.path('/login');
        })
        // handle error
        .catch(function () {
          $scope.showRegistrationFailedAlert = true;
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

  });

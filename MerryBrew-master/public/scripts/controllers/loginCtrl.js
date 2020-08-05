angular.module('loginCtrl', [])

    .controller('loginController', function ($scope, $http, authService, $location, $q) {

        $scope.login = function () {


            $scope.showLoginFailedAlert = false;
            $scope.disabled = true;

            authService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function () {
                    $scope.disabled = false;
                    $scope.loginForm = {};
                    $location.path('/Home');
                })
                // handle error
                .catch(function () {
                    $scope.showLoginFailedAlert = true;
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    });
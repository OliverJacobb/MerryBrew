angular.module('logoutCtrl', [])

    .controller('logoutController', function ($scope, $location, authService) {

        $scope.logout = function () {

            // call logout from service
            authService.logout()
                .then(function () {
                    $location.path('/login');
                });
        }

    })
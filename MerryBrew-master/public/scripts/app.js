var app = angular.module('MerryBrewApp', ['ngRoute', 'app.routes', 'angularCSS', 'loginCtrl', 'registerCtrl', 'logoutCtrl', 'homeCtrl', 'cocktailDetailsCtrl', 'favouritesCtrl', 'dataService', 'authService']);



app.run(function ($rootScope, $location, $route, authService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            authService.getUserStatus()
                .then(function () {
                    if (next.access.restricted && !authService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});
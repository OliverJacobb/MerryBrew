angular.module('authService', [])

    .factory('authService', function ($q, $timeout, $http) {

        var user = null;

        return ({
            isLoggedIn: function () {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            },
            getUserStatus: function () {
                return $http.get('/user/status')

                    .then(function (response) {
                        if (response.data.status) {
                            user = true;
                        } else {
                            user = false;
                        }
                    })

                    .catch(function (data) {
                        user = false;
                    });
            },
            login: function (username, password) {
                var deferred = $q.defer();


                $http.post('/user/login',
                    { username: username, password: password })

                    .then(function (response, data) {
                        if (response.status === 200) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })

                    .catch(function (data) {
                        user = false;
                        deferred.reject();
                    });


                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();


                $http.get('/user/logout')

                    .then(function (data) {
                        user = false;
                        deferred.resolve();
                    })

                    .catch(function (data) {
                        user = false;
                        deferred.reject();
                    });


                return deferred.promise;
            },
            register: function (username, password) {
                var deferred = $q.defer();


                $http.post('/user/register',
                    { username: username, password: password })

                    .then(function (response, data) {
                        if (response.status === 200) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })

                    .catch(function (data) {
                        deferred.reject();
                    });


                return deferred.promise;
            }
        })

    });
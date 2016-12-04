(function() {
        'user strict';

        angular.module('starter').factory('TokenInterceptor', TokenInterceptor);

        TokenInterceptor.$inject = ['$q', '$window', '$location'];

        function TokenInterceptor($q, $window, $location) {

            var t = {
                request: function(config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
                    }
                    return config;
                }

            };

            return t;
        };

})();

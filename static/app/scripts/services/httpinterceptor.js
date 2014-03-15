'use strict';

angular.module('retrospectApp')
  .factory('httpInterceptor', function($q, $location) {
    return {
        'responseError': function(rejection) {
      // do something on error
            if (rejection.status === 401) {
                $location.path('/unauthorized');
            }
            return $q.reject(rejection);
        }
    };
});

angular.module('retrospectApp')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});
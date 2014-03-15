'use strict';

angular.module('retrospectApp')
  .factory('Logout', ['$resource', 'SERVICE_URL',
    function ($resource, SERVICE_URL) {
        return $resource(SERVICE_URL + '/auth/logout');
    }
]);

'use strict';

angular.module('retrospectApp')
    .controller('MainCtrl', ['$scope', 'retrospectives', function ($scope, retrospectives) {
        $scope.retrospectives = [];

        // this throws an error with cross domain
        retrospectives.query(function (retrospectives) {
            $scope.retrospectives = retrospectives;
        });
    }
]);

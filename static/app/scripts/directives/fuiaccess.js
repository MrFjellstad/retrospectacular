'use strict';

angular.module('retrospectApp')
  .directive('fuiAccess',[ 'isLoggedIn', 'Logout', 'SERVICE_URL', '$compile',
    function (isLoggedIn, Logout, SERVICE_URL, $compile) {
    return {
        restrict: 'EA',
        link: function postLink(scope, element) {
            var defaultText = 'Sign In with Google',
                defaultUrl = SERVICE_URL + '/auth/google';
            scope.logout = function () {
                Logout.get(function () {
                    var newElement;
                    scope.text = defaultText;
                    scope.url = defaultUrl;

                    newElement = $compile('<a ng-href={{url}} class="btn btn-danger">{{text}}</a>')(scope);
                    delete scope.element;

                    element.replaceWith(newElement);
                    element = newElement;
                });
            };
            isLoggedIn.get(function (response) {
                var newElement;

                scope.elements = response;
                if (scope.elements.displayName) {
                    newElement = $compile('<a ng-click="logout()" class="btn btn-danger">{{elements.displayName}}</a>')(scope);

                } else {
                    scope.text = defaultText;
                    scope.url = defaultUrl;

                    newElement = $compile('<a ng-href={{url}} class="btn btn-danger">{{text}}</a>')(scope);
                }

                element.replaceWith(newElement);
                element = newElement;
            });
        }
    };
}]);


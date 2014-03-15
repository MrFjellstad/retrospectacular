'use strict';

describe('Directive: fuiAccess', function () {

  // load the directive's module
  beforeEach(module('retrospectApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fui-access></fui-access>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
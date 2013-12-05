'use strict';


// Declare app level module which depends on filters, and services
angular.module('BreakEven', [
  'ngRoute',
  'BreakEven.filters',
  'BreakEven.services',
  'BreakEven.directives',
  'BreakEven.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

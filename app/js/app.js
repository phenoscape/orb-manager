'use strict';


// Declare app level module which depends on filters, and services
angular.module('orb', [
'ngRoute',
'orb.filters',
'orb.services',
'orb.directives',
'orb.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/provisional_terms', {templateUrl: 'partials/provisional_terms.html', controller: 'ORBController'});
	$routeProvider.otherwise({redirectTo: '/provisional_terms'});
}]);

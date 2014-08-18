'use strict';

/* Services */

angular.module('orb.services', ['ngResource'])
    .value('version', '0.1')
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    }
    }]);
    ;

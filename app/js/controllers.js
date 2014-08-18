'use strict';

/* Controllers */

angular.module('orb.controllers', [])
    .controller('AppController', function($scope) {})
    .controller('ORBController', function($scope, $http) {

        $scope.loadAllTerms = function () {
            $http.get('http://data.bioontology.org/provisional_classes', {
                headers: {
                    Authorization: 'apikey token=' + $scope.apikey
                }
            }).success(function (data) {
                $scope.results = data.filter(function (item) {
                    return item.creator === 'http://data.bioontology.org/users/phenoscape';
                });
            });
            
        }

        function updateTermData(term) {
            var id = term['@id'];
            $http.get(id, {
                headers: {
                    Authorization: 'apikey token=' + $scope.apikey
                }
            }).success(function (data) {
                angular.copy(data, term);
            });
        }


        $scope.updatePermanentID = function() {
            $http({
                method: 'PATCH',
                url: $scope.term['@id'],
                data: {
                    permanentId: $scope.permanentID
                },
                headers: {
                    Authorization: 'apikey token=' + $scope.apikey
                }
            }).success(function(data, status) {
                updateTermData($scope.term);
            }).error(function(data, status) {
                alert("Failed to update permanent ID.")
            });
        };

    });

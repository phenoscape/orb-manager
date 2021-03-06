'use strict';

/* Controllers */

angular.module('orb.controllers', [])
    .controller('AppController', function($scope) {})
    .controller('ORBController', function($scope, $http) {

        $scope.loadAllTerms = function () {
            $http.get('http://data.bioontology.org/users/phenoscape/provisional_classes?apikey=' + $scope.apikey, {}
            ).success(function (data) {
                data.sort(function (a, b) {
                    return b.created.localeCompare(a.created)
                });
                
                $scope.allTerms = data;
                $scope.updateFilteredTerms();
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
        
        $scope.updateFilteredTerms = function () {
            $scope.results = filterTerms($scope.allTerms); 
        }
        
        function filterTerms(terms) {
            return terms.filter(function (term) {
                if ($scope.unresolvedOnly) {
                    return term.permanentId === null;
                } else {
                    return true;
                }
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

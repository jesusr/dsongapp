var dsong = angular.module('dsong');
dsong.controller('artistDetailCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        var id = $routeParams.artistId;
        $http.get('/api/artist/' + id + '/songs')
            .success(function(data) {
                $scope.songs = data;
                $scope.dataExist = function(attr) {
                    if (attr === null || attr === '') {
                        return false;
                    }
                    return attr.length;
                };
            });
        $http.get('/api/artist/' + id)
            .success(function(data) {
                data.length ? $scope.artist = data[0] : $scope.artist = false;
            });
    }
]);


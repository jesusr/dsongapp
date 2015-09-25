var dsong = angular.module('dsong');
dsong.controller('songsList', ['$scope', '$http', '$routeParams', '$rootScope',
    function($scope, $http, $routeParams, $rootScope) {
        $rootScope.loading = 1;
        var page, crit;
        if ($routeParams.page) {
            page = $routeParams.page;
        } else {
            page = 1;
        }
        if ($routeParams.crit) {
            crit = 'orderby/artist/1';
        } else {
            crit = '';
        }
        $http.get('/api/songs/15/' + page + '/' + crit)
            .success(function(data) {
                $scope.songs = data.data;
                $scope.page = data.page;
                $scope.ptotal = data.pageTotal;
                $scope.pnext = (data.pageTotal === page ? -1 : '/songs/' + (parseInt(page) + 1) + '/' +
                    crit);
                $scope.pprev = (page < 2 ? -1 : '/songs/' + (parseInt(page) - 1) + crit);
                $scope.dataExist = function(attr) {
                    if (attr === null || attr === '' || attr === 'undefined') {
                        return false;
                    }
                    return attr.length;
                };
            });
        $rootScope.loading = 0;
    }
]);


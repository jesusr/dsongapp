(function() {
    var dsong = angular.module('dsong');
    console.log(dsong);
    dsong.controller('artistsListCtrl', ['$scope', '$location', '$routeParams', '$http',
        function($scope, $location, $routeParams, $http) {
            var page;
            if ($routeParams.page) {
                page = $routeParams.page;
            } else {
                page = 1;
            }
            $http.get('/api/artists/15/' + page)
                .success(function(data) {
                    $scope.artists = data.data;
                    $scope.page = data.page;
                    $scope.ptotal = data.pageTotal;
                    $scope.pnext = (data.pageTotal === page ? -1 : parseInt(page) + 1);
                    $scope.pprev = (page < 2 ? -1 : page - 1);
                    $scope.dataExist = function(attr) {
                        if (attr === null || attr === '') {
                            return false;
                        }
                        return attr.length;
                    };
                });
        }
    ]);
}());


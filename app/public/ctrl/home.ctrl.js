(function() {
    var dsong = angular.module('dsong');
    dsong.controller('homeCtrl', ['$scope', '$location', '$http', 'flickrPhotos',
        function($scope, $location, $http, flickrPhotos) {
            $http.get('/api/artists/random/4')
                .success(function(d) {
                    var e;
                    $scope.artists = d;
                    $scope.img = [];

                    function callback(res) {
                        if (!res.items.length) {
                            $scope.img.push('/assets/res/img/dummy.png');
                        } else {
                            $scope.img.push(res.items[0].media.m);
                        }
                    }

                    for (e in d) {
                        flickrPhotos.load({
                            tags: d[e].name + ' , live',
                            tag_mode: 'all',
                            content_type: 1,
                            per_page: 1
                        }).then(callback(res));
                    }
                });
            $http.get('/api/songs/random/10')
                .success(function(data) {
                    var e;
                    $scope.songs = data;
                    $scope.img_songs = [];
                    for (e in data) {}
                });
        }
    ]);
})();


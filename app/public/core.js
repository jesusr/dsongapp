(function() {
    'use strict';
    var dsong;
    dsong = angular.module('dsong', ['ng', 'ngRoute', 'ngResource']);
    dsong.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
    dsong.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common.Accept = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    }]);
    dsong.config(function($routeProvider) {
        $routeProvider
            .when('/artists', {
                controller: 'artistsListCtrl',
                templateUrl: 'view/artists.html',
                title: 'Artists List'
            })
            .when('/artists/:page', {
                controller: 'artistsListCtrl',
                templateUrl: 'view/artists.html',
                title: 'Artists List'
            })
            .when('/artist/:artistId', {
                controller: 'artistDetailCtrl',
                templateUrl: 'view/artist.html',
                title: 'Artist Detail'
            })
            .when('/songs', {
                controller: 'songsList',
                templateUrl: 'view/songs.html',
                title: 'Songs List'
            })
            .when('/songs/:page', {
                controller: 'songsList',
                templateUrl: 'view/songs.html',
                title: 'Songs List'
            })
            .when('/songs/:page/orderby/:crit', {
                controller: 'songsList',
                templateUrl: 'view/songs.html',
                title: 'Songs List'
            })
            .when('/songs/:page/orderby/:crit/:desc', {
                controller: 'songsList',
                templateUrl: 'view/songs.html',
                title: 'Songs List'
            })
            .when('/song/:songId', {
                controller: 'songDetail',
                templateUrl: 'view/song.html',
                title: 'Songs Detail'
            })
            .when('/song/:songId/:method', {
                controller: 'songDetail',
                templateUrl: 'view/song.html',
                title: 'Songs Detail'
            })
            .when('/home', {
                templateUrl: 'view/home.html',
                title: 'Home'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
    dsong.run(function($rootScope) {
        $rootScope.loading = 0;
    });
    dsong.factory('flickrPhotos', function($resource) {
        return $resource('http://api.flickr.com/services/feeds/photos_public.gne', {
            format: 'json',
            jsoncallback: 'JSON_CALLBACK'
        }, {
            'load': {
                'method': 'JSONP'
            }
        });
    });
    dsong.controller('songDetail', ['$scope', '$http', '$routeParams',
        function($scope, $http, $routeParams) {
            var id = $routeParams.songId;
            if ($routeParams.method == 'remove') {
                $http.delete('/api/song/' + id);
            } else {
                $http.get('/api/song/' + id)
                    .success(function(data) {
                        $scope.song = data;
                        $scope.img = assets.getImage();
                        $scope.songAudioplayer = data.audioplayer.split('/').splice(-1)[0].replace(/\s+/g, '');
                        $scope.dataExist = function(attr) {
                            if (attr === null || attr === '') return false;
                            return attr.length;
                        };
                    });
            }
        }
    ]);

}());

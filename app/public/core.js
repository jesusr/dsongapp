(function(){
  dsong = angular.module('dsong', ['ngRoute']);
  dsong.config(['$locationProvider', function($locationProvider){
      $locationProvider.html5Mode({enabled: true, requireBase: false });
      $locationProvider.html5Mode(true).hashPrefix('!');
  }]);
  dsong.config(function($routeProvider){
    $routeProvider
      .when( '/artists', { controller: 'artistsListCtrl', templateUrl: 'view/artists.html', title: "Artists List" } )   
      .when( '/artists/:page', { controller: 'artistsListCtrl', templateUrl: 'view/artists.html', title: "Artists List" } )   
      .when( '/artist/:artistId', { controller: 'artistDetailCtrl', templateUrl: 'view/artist.html', title: "Artist Detail" } )   
      .when( '/songs', { controller: 'songsList', templateUrl: 'view/songs.html', title: "Songs List" } )
      .when( '/songs/:page', { controller: 'songsList', templateUrl: 'view/songs.html', title: "Songs List" } )
      .when( '/song/:songId',{ controller: 'songDetail', templateUrl: 'view/song.html', title: "Songs Detail" } )
      .when( '/',{})
      .otherwise( { redirectTo: '/' } );
  });
  dsong.run(function ($rootScope) {});
  dsong.controller('songDetail', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
      var id = $routeParams.songId;
      $http.get('/api/song/'+id)
        .success(function(data) {
          $scope.song = data;
          $scope.songAudioplayer = data.audioplayer.split('/').splice(-1)[0].replace(/\s+/g, '');
          $scope.dataExist = function(attr){
            if(attr == null || attr == "") return false;
            return attr.length;
          };
        });
    }]);
  dsong.controller('songsList', ['$scope', '$http', '$routeParams','$rootScope',
    function ($scope, $http, $routeParams, $rootScope) {
      if ($routeParams.page) page=$routeParams.page;
      else page=1;
      $http.get('/api/songs/15/'+page)
        .success(function(data) {
          $scope.songs = data.data;
          $scope.page = data.page;
          $scope.ptotal = data.pageTotal;
          $scope.pnext = (data.pageTotal === page ? -1 : parseInt(page)+1);
          $scope.pprev = (page<2 ? -1 : page-1);
          console.log($scope.pprev);
          console.log($scope.pnext);
          $scope.dataExist = function(attr){
            if(attr == null || attr == "" || attr == "undefined") return false;
            return attr.length;
          };
        });
    }]);
}());
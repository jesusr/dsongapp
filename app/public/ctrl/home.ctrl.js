
  (function(){
    var dsong= angular.module('dsong');
    dsong.controller('homeCtrl', ['$scope','$location', '$http', 'flickrPhotos',
      function($scope, $location, $http, flickrPhotos){
        $http.get('/api/artists/random/4')
          .success(function(data){
            $scope.artists = data;
            $scope.img = [];
            for (e in data){
              flickrPhotos.load({ tags: data[e].name +' , live', tag_mode : 'all' , content_type: 1, per_page: 1},function(data){
                if(!data.items.length) $scope.img.push('/assets/res/img/dummy.png');
                else $scope.img.push(data.items[0].media.m);
              });   
            }
          });
        $http.get('/api/songs/random/10')
          .success(function(data){
            $scope.songs = data;
            $scope.img_songs = [];
            for (e in data){
            }
          });  
      }]);
  })();

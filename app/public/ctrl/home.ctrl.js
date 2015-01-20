(function(){
  var dsong= angular.module('dsong');
  dsong.controller('homeCtrl', ['$scope','$location', '$http', 'flickrPhotos',
    function($scope, $location, $http, flickrPhotos){
      $http.get('/api/artists/random/4')
        .success(function(data){
          $scope.artists = data;
          $scope.img = [];
          for (e in data){
            console.log(data[e]);
            $scope.img.push(flickrPhotos.load({ tags: data[e].name +' , live', tag_mode : 'all' , content_type: 1}));   
          }
          console.log($scope.img);
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
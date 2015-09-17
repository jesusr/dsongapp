
  dsong.controller('songsList', ['$scope', '$http', '$routeParams','$rootScope', 'flickrPhotos',
    function ($scope, $http, $routeParams, $rootScope, flickrPhotos) {
      $rootScope.loading = 1;
      if ($routeParams.page) var page = $routeParams.page;
      else var page=1;
      if ($routeParams.crit) var crit = 'orderby/artist/1'; else crit = "";
      $http.get('/api/songs/15/'+page+'/'+crit)
        .success(function(data) {
          console.log("12313");
          $scope.songs = data.data;
          $scope.page = data.page;
          $scope.ptotal = data.pageTotal;
          $scope.pnext = (data.pageTotal === page ? -1 : '/songs/'+(parseInt(page)+1)+'/'+crit);
          $scope.pprev = (page<2 ? -1 : '/songs/'+(parseInt(page)-1)+crit);
          $scope.dataExist = function(attr){
            if(attr == null || attr == "" || attr == "undefined") return false;
            return attr.length;
          };
        });
      $rootScope.loading = 0;
    }]);

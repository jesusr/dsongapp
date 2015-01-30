(function(){
  var dsong= angular.module('dsong');
  dsong.controller('navCtrl', ['$scope','$location', function($scope,$location) {
    $scope.menu = [
      {
        'name': 'Artistas',
        'route': '/artists',
        'subitems': [
          {
            'name': '',
            'funcion': ''
          },
          {
            'name': 'Filtro 2',
            'funcion': 'filter2'
          }
        ] 
      },
      {
        'name': 'Álbumes',
        'route': '/albums'
      },
      {
        'name': 'Canciones',
        'route': '/songs',
        'subitems': [
          {
            'name': 'Artista',
            'funcion': '/songs/1/orderby/artist'
          },
          {
            'name': 'Filtro 2',
            'funcion': 'filter2'
          }
        ]
      }
    ];
    $scope.navClass = function (page) {
      return $location.path().indexOf(page) >= 0 ? 'active' : '';
    }; 
    $scope.headerClass = function(){
      return $location.path().indexOf("songs") > 0 ||  $location.path().indexOf("artists") > 0 || $location.path().indexOf("albums") > 0 ? 'activated' : '0';
    };
  }]);
  dsong.directive('navigation', function() {
    return {
      templateUrl: '../view/nav.html',
      controller: 'navCtrl'
    };
  });
}());
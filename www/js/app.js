// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])
.controller('MenuCtrl', function($scope,$http) {
    $scope.host = "";
    $scope.url = 'http://' + $scope.host + '/READ/HOT';
    $scope.selectDrama = new Object();
    $scope.openApp = true;
    showData($scope,$scope.url);
    function showData($scope,url) {
      $http({method: 'GET', url: $scope.url}).success(function(data)
      {
         $scope.dramas = data;
         if ($scope.openApp == false) {
           $scope.sideMenuController.toggleLeft();
         }
         $scope.openApp = false;
      }).error(function(data, status, headers, config) {
              
      });
    }
    $scope.select = function(id) {
      
      $http({method: 'GET', url: 'http://' + $scope.host + '/api/v1/dramas/new_dramas_info.json?dramas_id=' + id }).success(function(data)
      {
        $scope.selectDrama.id = data[0].id;
        $scope.selectDrama.name = data[0].name;  
        $scope.selectDrama.introduction = data[0].introduction;
        $scope.selectDrama.area_id = data[0].area_id;
        $scope.selectDrama.actors = data[0].actors;
        $scope.selectDrama.poster_url = data[0].poster_url;
        $scope.selectDrama.year = data[0].year;
        $scope.selectDrama.final = data[0].final;
        $scope.selectDrama.eps_num_str = data[0].eps_num_str.split(",");
        $scope.sideMenuController.toggleRight();
      }).error(function(data, status, headers, config) {
        alert(data);
      });
    };
    $scope.hot = function() {
      $scope.url = 'http://' + $scope.host + '/READ/HOT';
      showData($scope,$scope.url);
    };
    $scope.new = function() {
      $scope.url = 'http://' + $scope.host + '/READ/NEW';
      showData($scope,$scope.url);
    };
    $scope.tw = function() {
      $scope.url = 'http://' + $scope.host + '/READ/TW/0/10';
      showData($scope,$scope.url);
    };
    $scope.jp = function() {
      $scope.url = 'http://' + $scope.host + '/READ/JP/0/10';
      showData($scope,$scope.url);
    };
    $scope.kr = function() {
      $scope.url = 'http://' + $scope.host + '/READ/KR/0/10';
      showData($scope,$scope.url);
    };
    $scope.ch = function() {
      $scope.url = 'http://' + $scope.host + '/READ/CH/0/10';
      showData($scope,$scope.url);
    };
    $scope.link = function(num) {
      $http({method: 'GET', url: 'http://' + $scope.host + '/api/v1/dramas/find_by_drama_and_ep_num.json?drama_id=' + $scope.selectDrama.id + '&num=' + num  }).success(function(data)
      {
        alert(data[0].link);
        window.location.href = data[0].link;
      });
    }
    $scope.openLeft = function() {
      $scope.sideMenuController.toggleLeft();
    };
  })

.directive('fadeBar', function($timeout) {
  return {
    restrict: 'E',
    template: '<div class="fade-bar"></div>',
    replace: true,
    link: function($scope, $element, $attr) {
      $timeout(function() {
        $scope.$watch('sideMenuController.getOpenRatio()', function(ratio) {
          $element[0].style.opacity = Math.abs(ratio);
        });
      });
    }
  }
});


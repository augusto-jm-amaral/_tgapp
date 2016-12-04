angular.module('starter').controller('HorarioCtrl',
  function($scope, $timeout, DataBase, Sync) {
    //$rootScope.backButtonClass = 'button-energized'

    $scope.horarios = [];

    $scope.template = {};

    $scope.showList = false;

    DataBase.getData('getHorario', function (data) {
      $scope.setData(data);
    });

    $scope.doRefresh = function () {
      Sync.sync('getHorario', function (data) {
        $scope.setData(data);
      }, function (err) {
        if(!$scope.horarios){
          $scope.setData();
        }else{
          $scope.$broadcast('scroll.refreshComplete');
        }
      });
    };

    $scope.setData = function (data) {
      if(data && data.length > 0){
        $scope.horarios = data;
        $scope.showList = true;
        $scope.template = {};
      }else{
        if(!$scope.horarios.length > 0){
          $scope.showList = false;
          $timeout(function() {
            $scope.template.url = 'templates/messages/semDados.html';
          }, 200);
        }
      }
      $scope.$broadcast('scroll.refreshComplete');
    };

  }
);

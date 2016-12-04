angular.module('starter').controller('AtividadeCtrl',
  function($scope, $ionicModal, Network, Sync, DataBase) {

    $scope.atividades = [];

    DataBase.getData('atividades', function (ati) {
      $scope.atividades = ati;
    });

    $scope.doRefresh = function () {
      Sync.sync('atividades', function (data) {
        $scope.atividade = data;
        $scope.$broadcast('scroll.refreshComplete');
      }, function (error) {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

  }
);

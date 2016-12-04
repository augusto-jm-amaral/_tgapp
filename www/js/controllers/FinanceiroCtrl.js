angular.module('starter').controller('FinanceiroCtrl',
  function($scope, $timeout, $ionicModal, Network, Sync, DataBase) {

    $scope.financeiros = [];

    $scope.template = {};

    $scope.showList = false;

    DataBase.getData('financeiro', function (data) {
      $scope.setData(data);
    });

    $scope.doRefresh = function () {
      Sync.sync('financeiro', function (data) {
        $scope.setData(data);
      }, function (err) {
        if(!$scope.comunicados){
          $scope.setData();
        }else{
          $scope.$broadcast('scroll.refreshComplete');
        }
      });
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/showFinanceiro.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.showModal = function(item) {
      $scope.finModal = item;
      if(item.extrato.length > 0)
        $scope.modal.show();
    };

    $scope.setData = function (data) {
      if(data && data.length > 0){
        $scope.financeiros = data;
        $scope.showList = true;
        $scope.template = {};
      }else{
        if(!$scope.financeiros.length > 0){
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

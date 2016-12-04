angular.module('starter').controller('AppCtrl',
  function($scope, $rootScope, $state,  Toast) {

    // $rootScope.perfil = {nome: 'João'};

    $scope.logout = function () {
      $state.go('login');
      $rootScope.clearHistory();
      // $rootScope.percent = 0;
    };

  }
);

angular.module('starter').controller('NotificacaoCtrl',
  function($scope, $rootScope) {

    $scope.messageCard = false;
    $scope.iconMessage = true;
    $scope.cssAnimationCard = '';


    var splashNotification = function () {
      $scope.iconMessage = true;
      setTimeout(function(){
        $scope.$apply(function()
        {
          $scope.iconMessage = false;
          $scope.cssAnimationCard = 'animated flipInY';
          $scope.messageCard = true;
        });
      }, 2500);

    };

    splashNotification();

  }
);

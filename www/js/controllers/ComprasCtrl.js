angular.module('starter').controller('ComprasCtrl',
  function($scope, $ionicModal, $http, $rootScope, $timeout, Toast) {

    $scope.compras = [];

    // $scope.compras = [
    //     {
    //         loja: 'João Sapatos SA.',
    //         data: '30/10/2016',
    //         valor: 92,
    //         produtos: [
    //             {
    //                 nome: 'Sapato Muito Bom',
    //                 valor: '41',
    //                 desc: 'Muito bom para todos os pés',
    //                 qtd: 1,
    //                 cor: 'Preto',
    //                 tamanho: '41'
    //
    //             },
    //             {
    //                 nome: 'Sapato Muito Legal',
    //                 valor: '51',
    //                 desc: 'Muito legal para todos os pés',
    //                 qtd: 1,
    //                 cor: 'Preto',
    //                 tamanho: '40'
    //
    //             }
    //         ]
    //     },{
    //         loja: 'João Sapatos SA.',
    //         data: '31/10/2016',
    //         valor: 82,
    //         produtos: [
    //             {
    //                 nome: 'Sapato Muito Bom',
    //                 valor: '41',
    //                 desc: 'Muito bom para todos os pés',
    //                 qtd: 2,
    //                 cor: 'Azul',
    //                 tamanho: '38/39'
    //
    //             }
    //         ]
    //     }
    // ];

    $scope.compra = {};

    $scope.doRefresh = function () {
      $scope.carregaCompras();
        // $timeout(function() {
        //     $scope.$broadcast('scroll.refreshComplete');
        // }, 2000);
    };

    // // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/showCompra.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // // Triggered in the login modal to close it
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // // Open the login modal
    $scope.showModal = function(item) {
      $scope.compra = item;
      $scope.modal.show();
    };

    $scope.carregaCompras = function () {
      $http.get($rootScope.url + '/compras')
        .then(function (res) {
          Toast.showMessage('Lista atualizada.');
          $scope.compras = res.data;
        }).catch(function (err) {
          Toast.showMessage('Falha ao atualizar a lista.');
        });
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.carregaCompras();

  }
);

angular.module('starter').controller('PromocoesCtrl',
  function($scope, $timeout, $ionicModal, $window, $ionicLoading) {

    $scope.promocoes = [
        {
            loja: 'João Sapatos SA.',
            data: '30/10/2016',
            titulo: 'Só Hoje 50% de Desconto para você!',
            desc: 'Este sapato sai por metade do preço para você somente hoje! corra para a loja!',
            produto:  {
                    nome: 'Sapato Muito Bom',
                    valor: '41',
                    desc: 'Muito bom para todos os pés',
                    cor: 'Preto',
                    tamanho: '41'

                }

        },{
            loja: 'João Sapatos SA.',
            data: '31/10/2016',
            titulo: 'Só Hoje 30% de Desconto para você!',
            desc: 'De R$ 41,00 por R$ 28,70 só hoje corra para a loja!',
            produto:
                {
                    nome: 'Sapato Muito Bom',
                    valor: '41',
                    desc: 'Muito bom para todos os pés',
                    cor: 'Azul',
                    tamanho: '38/39'

                }

        }
    ];

    $scope.promocao = {};


    // $scope.template = {};

    // $scope.showList = false;

    // DataBase.getData('getComunicados', function (data) {
    //   // console.log(JSON.stringify(data));
    //   $scope.setData(data);
    // });

    $scope.doRefresh = function () {
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            Toast.showMessage('Lista atualizada.');
        }, 2000);
    };

    // // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/showPromocoes.html', {
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
      $scope.promocao = item;
      $scope.modal.show();
    };

  }
);

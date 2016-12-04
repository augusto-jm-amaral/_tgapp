angular.module('starter').controller('LoginCtrl',
  function($scope, $interval, $rootScope, $ionicModal, $http, $window, $ionicHistory, $state, Toast) {

    // var isOnline = false;

    $rootScope.url = 'http://localhost:3000';
    $rootScope.usuario = {};

    $scope.cadastro = {};
    $scope.login = {};
    $scope.login = {email: 'jo.lurdes@gmail.com', password: '123456'};

    // Login Action
    $scope.doLogin = function() {

      $http.post($rootScope.url+ '/users/login', $scope.login)
        .then(function (res) {
          Toast.showMessage('Bem vindo');
          $scope.login = {};
          $rootScope.usuario = res;
          $window.sessionStorage.token = res.data.token;
          // $scope.closeModal();
        }).catch(function (err) {
          Toast.showMessage('Usuário ou senha incorretos');
        });

        $state.go('app.compras');
    };

    $scope.doCadastro = function() {

      // console.log($scope.login);

      $http.post($rootScope.url+ '/users/consumidor', $scope.cadastro)
        .then(function (res) {
          Toast.showMessage('Cadastro realizado com sucesso');
          $scope.cadastro = {};
          $scope.closeModal();
        }).catch(function (err) {
          Toast.showMessage('Houve um erro tente novamente');
        });

    };



      // $rootScope.clearHistory();

    $ionicModal.fromTemplateUrl('templates/showUsersTest.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.showModal = function(item) {
      $scope.modal.show();
    };

    function loginComplete() {
      $state.go('app.comunicados');
      // $rootScope.showFormLogin = true;
      // $scope.loginData.password = '';
      // Push.subscribe();
    };

    // function syncAndLogin() {
    //   Sync.syncAll(function () {
    //     loginComplete();
    //   });
    // };

    $rootScope.clearHistory = function(){
      $window.localStorage.clear();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    };
  }
);

angular.module('starter').factory('Sync',
  function($rootScope, $timeout, $q, $state, DataBase, Network, Toast) {

    $rootScope.gets = ['getPerfil', 'getHorario', 'getCalendario', 'getComunicados', 'getTurmas'];

    var sync = {

      sync: function (key, callbacksucess, callbackerror) {

        var data = {
          name: key
        };

        var promise = Network.getFrom(data);
        promise.then(function (e) {
          if(e.data){
            DataBase.setData(key, e.data);
            if(typeof callbacksucess == 'function'){
              callbacksucess(e.data);
            }
          }
        }).catch(function (e) {
          console.error(e);
          if(typeof callbackerror == 'function'){
            callbackerror(e);
          }
        });

      },// END SYNC

      syncAll: function (callback) {

        var promises = [];
        var oneSync = Math.round(100/$rootScope.gets.length);
        var aux = 0;

        angular.forEach($rootScope.gets, function(get) {

          var deferred = $q.defer();

          sync.sync(get, function (response){

            sumProgressBar();
            deferred.resolve(response);

          }, function (err) {

            deferred.reject(err);

          });

          promises.push(deferred.promise);

        });

        $q.all(promises).then(
          function(results) {
            $timeout(function () {

              console.log('END SYNC');
              $rootScope.percent = 0;
              if(typeof callback === 'function')
                callback();
            });

          },
          function(response) {

            $timeout(function () {
              console.log('ERR SYNC');
              $rootScope.showFormLogin = true;
              Toast.showMessage('Houve um erro ao sincronizar seu dispositivo, tente novamente');
              $state.go('login');
            });

          });

        function sumProgressBar() {

          for (var i = 0; i < oneSync; i++) {
            $timeout(function () {
              $rootScope.percent++;
            },50*i);
          }
        };

      }// END syncAll

    };

    return sync;
  }
);

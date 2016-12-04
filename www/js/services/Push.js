angular.module('starter').factory('Push',
  function($state, $rootScope, Network) {

    var appid = 'br.com.tnttec.prof';
    var push = null;

    $rootScope.notification = {};

    function afterRegister() {

      push.on('registration', function(token) {
        var data = {
          name: 'setpushuser',
          params: {
            idpush: token.registrationId,
            appid: appid,
            uuid: $rootScope.uuid
          }
        };

        var promise = Network.getFrom(data)
          .then(function (data) {
            if(data.data.success){
              console.log('SETPUSHUSER::' + JSON.stringify(data.data));
            }else{
              console.log('SETPUSHUSER ERR::' + JSON.stringify(data.data));
            }
          })
          .catch(function (e) {
            console.error(e);
          });
      });

      push.on('notification', function(data) {
        console.log('Push:: Received Notification');
        console.log(JSON.stringify(data));
        $rootScope.notification = data;
        $state.go('app.notificacao');
      });

    };

    //Authorization key=AIzaSyDdoftHZTLeSKVP7Gy0tRGdYeIZLkCLxOU

    var p = {
      init: function () {

      },
      subscribe: function () {

        if(window.cordova && Network.isOnline()){

          push = PushNotification.init({
              android: {
                  senderID: "732867896423"
              },
              ios: {
                  alert: "true",
                  badge: "true",
                  sound: "true"
              },
              windows: {}
          });

          // push.unregister(function (e) {
          //   console.log('Success');
          // }, function (e) {
          //   console.log('Error');
          // });

          afterRegister();

          push.on('error', function(e) {
              console.log(e.message);
          });

        }
      }
  };

    return p;
  }
);

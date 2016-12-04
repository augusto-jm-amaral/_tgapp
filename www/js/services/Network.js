angular.module('starter').factory('Network',
  function($http, $interval, $rootScope, $cordovaNetwork) {

    //$rootScope.StringConnection - STRING DE CONEXÂO COM O BANCO
    //$rootScope.BaseUrl - STRING DE CONEXÂO COM O BANCO

    var idservice = '132';

    $rootScope.BaseUrl = 'http://uniitalo.tnttec.com.br';
    // $rootScope.BaseUrl = 'http://homol.uniitalo.tnttec.com.br';

    // console.log($rootScope.BaseUrl+'/erptnt/ACTOrionWebService?idservice='+ idservice);

    $rootScope.taskIsOnline = $interval(function () {
      $http.get($rootScope.BaseUrl+'/erptnt/ACTOrionWebService?idservice='+ idservice, { timeout: 4500 }).then(function (res) {
        $rootScope.isOnline = true;
      }).catch(function (err) {
        $rootScope.isOnline = false;
      });
    }, 5000);

    var network = {

      getUrlService: function (data) {

        console.log(JSON.stringify(data));

        var urlIntermediate_1 = '/erptnt/ACTOrionWebService?idservice='+ idservice;

        var urlIntermediate_2 = '/erptnt/ACTOrionWebService?idservice=' + idservice + '&idconn=' + $rootScope.StringConnection;

        if(data.name){
          switch (data.name) {

            case 'getLogin':
              return urlIntermediate_1 + "&action=logar&idies=" + data.params.idies + "&idprof=" + data.params.username + "&password=" + data.params.password;
              break;
            case 'getTurmas':
              return urlIntermediate_2 + '&action=turmas';
              break;
            case 'getDiarios':
              return urlIntermediate_2 + '&action=diario&iddiscipturma=' + data.params.iddiscipturma;
              break;
            case 'getAlunos':
              return urlIntermediate_2 + '&action=diarioaluno'+
                '&iddiscipturma=' + data.params.iddiscipturma +
                '&listapre=' + data.params.numlistapre;
              break;
            case 'getHorario':
              return urlIntermediate_2 + '&action=horario';
              break;
            case 'getCalendario':
              return urlIntermediate_2 + '&action=calendario';
              break;
            case 'getMoodle':
              return urlIntermediate_2 + '&action=moodle';
              break;
            case 'getPerfil':
              return urlIntermediate_2 + '&action=perfil';
              break;
            case 'getComunicados':
              return urlIntermediate_2 + '&action=comunicados';
              break;
            case 'setListaPresenca':
              return urlIntermediate_2 + '&action=manterlistapresenca';
              break;

            //URL PUSH
            case 'getpushuser':
              return urlIntermediate_2 + '&action=getpushuser&appid=' + data.params.appid;
              break;
            case 'setpushuser':
              return urlIntermediate_2 + '&action=pushuser&idpush=' + data.params.idpush + '&appid=' + data.params.appid + '&uuid=' + $rootScope.uuid;
              break;
            case 'unsubscribepushuser':
              return urlIntermediate_2 + '&action=unsubscribepushuser&idpush=' + data.params.idpush + '&appid=' + data.params.appid;
              break;

            //NOTIFICACAO
            case 'registernotification':
              return urlIntermediate_2 + '&action=registernotification&idnotificacao=' + data.params.idnotificacao;
              break;
            default:
              console.error('Network: name not found "' + data.name + '".');

          }
        }else{
          console.error('Network: name undefined.');
        }
      },

      getUrl: function (data) {
        return $rootScope.BaseUrl + network.getUrlService(data);
      },

      getFrom: function (data) {

        var url = $rootScope.BaseUrl + network.getUrlService(data);

        console.log('Network:: get ' + url);

        return $http.get(url);
      },

      postFrom: function (data) {

        var url = $rootScope.BaseUrl + network.getUrlService(data);

        console.log('Network:: post ' + url);

        return $http.post(url, data.params.dados);
      },

      getBasesUrl: function () {
        return [
          {title: 'SISTEMAS TNT INTERNO', url: 'http://sistemas.tnt:8080' },
          {title: 'IASCJ HOMOL', url: 'http://iascj.tnttec.com.br' },
          {title: 'IASCJ PROD', url: 'http://orion.iascj.org.br' },
          {title: 'SAAS DEMO', url: 'http://saas.tnttec.com.br' },
          {title: 'SISTEMAS TNT EXTERNO', url: 'https://tnttec.com.br' },
          {title: 'UNIITALO HOMOL', url: 'http://homol.uniitalo.tnttec.com.br' },
          {title: 'UNIITALO', url: 'http://uniitalo.tnttec.com.br' }
      ];
    },

    isOnline: function () {

      if (window.cordova) { // device

        if(navigator.connection.type != 'none' && $rootScope.isOnline){
          return true;
        }

        // return $cordovaNetwork.isOnline();

      }else{ // browser

        return window.navigator.onLine;
      }
    } // END ISONLINE

    };

  	return network;
  }//AND NETWORK
);

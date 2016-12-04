// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
  // $httpProvider.defaults.headers.get = {};
  // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider
  .state('login',{
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // COMUNICADOS
  .state('app.compras', {
    url: '/compras',
    views: {
      'appContent': {
        templateUrl: 'templates/compras.html',
        controller: 'ComprasCtrl'
      }
    }
  })

  // DIARIO
  .state('app.cadastrocompra', {
    url: '/cadastrocompra',
    views: {
      'appContent': {
        templateUrl: 'templates/cadastrocompra.html',
        controller: 'CadastroCompraCtrl'
      }
    }
  })

  // Horário
  // .state('app.horario', {
  //   url: '/horario',
  //   views: {
  //     'appContent': {
  //       templateUrl: 'templates/horario.html',
  //       controller: 'HorarioCtrl'
  //     }
  //   }
  // })

  // // Moodle
  // .state('app.moodle', {
  //   url: '/moodle',
  //   views: {
  //     'appContent': {
  //       templateUrl: 'templates/moodle.html',
  //       controller: 'MoodleCtrl'
  //     }
  //   }
  // })

  // Calendario
  .state('app.promocoes', {
    url: '/promocoes',
    views: {
      'appContent': {
        templateUrl: 'templates/promocoes.html',
        controller: 'PromocoesCtrl'
      }
    }
  })
  //
  // // Notificacao
  // .state('app.notificacao', {
  //   url: '/notificacao',
  //   views: {
  //     'appContent': {
  //       templateUrl: 'templates/notificacao.html',
  //       controller: 'NotificacaoCtrl'
  //     }
  //   }
  // })
  ;
  // $urlRouterProvider.otherwise('/app/calendario');
  $urlRouterProvider.otherwise('/login');
});

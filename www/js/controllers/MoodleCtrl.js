angular.module('starter').controller('MoodleCtrl',
  function($state, $scope, $timeout, Network) {

    $scope.template = {};

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'yes'
    };

    $scope.openModle = function () {

      var ref = cordova.InAppBrowser.open(Network.getUrl({name: 'getMoodle'}), '_blank', 'location=yes');
      ref.addEventListener('loadstart', function(event) { console.log(event.url); });
      ref.addEventListener('exit', function(event) { $state.go('app.comunicados') });
    };

    $scope.isOnline = Network.isOnline();

    if(!$scope.isOnline){
      $timeout(function() {
        $scope.template.url = 'templates/messages/semConexao.html';
      }, 200);
    }else{
      $scope.openModle();
    }
});

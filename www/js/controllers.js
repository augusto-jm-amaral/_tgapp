angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
    cordova.plugins.barcodeScanner.scan(
       function (result) {
           alert("We got a barcode\n" +
                 "Result: " + result.text + "\n" +
                 "Format: " + result.format + "\n" +
                 "Cancelled: " + result.cancelled);
       },
       function (error) {
           alert("Scanning failed: " + error);
       },
       {
           "preferFrontCamera" : true, // iOS and Android
           "showFlipCameraButton" : true, // iOS and Android
           "prompt" : "Place a barcode inside the scan area", // supported on Android only
           "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
           "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
       }
    );
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

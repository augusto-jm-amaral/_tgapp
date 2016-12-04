angular.module('starter').factory('Toast',
  function($cordovaFile, $scope) {


    var f = {
      write : function (filename, object, callbackSuccess, callbackError) {

        try{
          var objectStr = JSON.stringify(object);

          $cordovaFile.writeFile(cordova.file.applicationStorageDirectory, filename, objectStr, true)
            .then(function (success) {
              if(typeof callbackSuccess == 'function'){
                callbackSuccess(success);
              }
            }, function (error) {
              if(typeof callbackError == 'function'){
                callbackError(error);
              }
            });

        }catch(e){
          if(typeof callbackError == 'function'){
            console.error(e);
            callbackError(e);
          }
        }

      },

      read : function (filename, callbackSuccess, callbackError) {
        $cordovaFile.readAsText(cordova.file.applicationStorageDirectory + '/' + filename, $scope.inputs.readFile)
          .then(function (success) {
            if(typeof callbackSuccess == 'function'){
              callbackSuccess(success);
            }
          }, function (error) {
            if(typeof callbackError == 'function'){
              callbackError(error);
            }
          });
      }
    };

    return f;
  }
);

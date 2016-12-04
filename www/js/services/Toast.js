angular.module('starter').factory('Toast',
  function() {


    var toast = {
      showMessage: function (message, duration, location) {

        if (window.cordova) { // device

          // $cordovaToast.show(message, duration ? duration : 'long', location ? location : 'center').then(function(success) {
          //   console.log('Toast:: Message show.')
          // }, function (error) {
          //   console.error(error);
          // });

          window.plugins.toast.showWithOptions(
            {
              message: message,
              duration: duration ? duration : 'long', // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
              position: location ? location : 'center',
              addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            }
            // onSuccess, // optional
            // onError    // optional
          );

        }else{ // browser
          alert(message);
        }

      }
    };

    return toast;
  }
);

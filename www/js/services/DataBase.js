angular.module('starter').factory('DataBase',
  function($cordovaSQLite) {

    var dbname = 'ptlprof';
    var db = null;

    var database = {
      init: function () {

        if (window.cordova) {
            db = $cordovaSQLite.openDB({ name: dbname }); //device
        }else{
            db = window.openDatabase(dbname, '1.0', 'my', 1024 * 1024 * 100); // browser
        }

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS'
                                      + ' dados (id INTEGER PRIMARY KEY AUTOINCREMENT'
                                      + ', key TEXT NOT NULL,'
                                      + 'json TEXT NOT NULL)', [])
                                      .then(function(res) {
                                        console.log(res.insertId ? 'DataBase:: Create table dados.' : 'DataBase:: Don\'t create table dados.');
                                      }, function (err) {
                                        console.error(err);
                                      });

      }, // END INIT

      setData: function (key, json, callback) {

        var query = 'SELECT 1 FROM dados WHERE key = ?';

        if(typeof json == 'object'){
          json = JSON.stringify(json);
        }

        $cordovaSQLite.execute(db, query, [key]).then(function(res) {

            if(res.rows.length > 0) {

                query = 'UPDATE dados SET json = ? WHERE key = ?';

                $cordovaSQLite.execute(db, query, [json, key])
                .then(function(res) {
                  console.log('DataBase:: UPDATE key -> ' + key);

                }, function (err) {
                  console.error(err);
                });

            } else {

                query = 'INSERT INTO dados (key, json) VALUES (?,?)';

                $cordovaSQLite.execute(db, query, [key, json])
                .then(function(res) {
                  console.log('DataBase:: INSERT key-> ' + key);

                }, function (err) {
                  console.error(err);
                });


          }

        }, function (err) {
            console.error(err);
        });

        if(typeof callback == 'function'){
          callback(json);
        }

      }, // END SETDATA

      getData: function (key, callback) {

        var query = 'SELECT json FROM dados WHERE key = ?';

        $cordovaSQLite.execute(db, query, [key])
        .then(function(res) {

          if(res.rows.length > 0 && typeof callback == 'function'){
            callback(JSON.parse(res.rows.item(0).json));
          }else{
            callback(null);
          }

        }, function (err) {
          console.error(err);
          callback(null);
        });


      }, // END GETDATA

      clearDB: function (callback) {
        var query = 'DELETE FROM dados';

        $cordovaSQLite.execute(db, query, [])
        .then(function(res) {
          console.log('DataBase:: Clear DataBase');

          if(typeof callback == 'function'){
            callback();
          }

        }, function (err) {
          console.error(err);
        });
      } // END CLEARDB
    };

    return database;
  }
);

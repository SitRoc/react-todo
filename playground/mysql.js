var mysql = require('mysql');
var fs = require('fs');
var CsvReader = require('csv-reader');
var NodeGeocoder = require('node-geocoder');
var firebase = require('firebase');
var GeoFire = require('geofire');
var jQuery = require('jQuery');

var config = {
    apiKey: "AIzaSyDN_qxCMhAc7CiFsrX1haXV8ZwX2RIv8ZE",
    authDomain: "artsee-1fb48.firebaseapp.com",
    databaseURL: "https://artsee-1fb48.firebaseio.com",
    projectId: "artsee-1fb48",
    storageBucket: "artsee-1fb48.appspot.com",
    messagingSenderId: "394078478396"
  };

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref('locations');
//var firebaseRef = firebase.database().ref('locations').push();
//var firebaseRef = firebase.database().ref('locations/-KrRbzaqa7YuWT4_oucH');
//var firebaseRef = firebase.database().ref('locations/-KrRbzaqa7YuWT4_oucH').push();

//var ref = firebase.database().ref();

var geoFire = new GeoFire(firebaseRef);

//var locationsRef = firebaseRef.child('locations');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBlmwntzSZ1_qBjNTxgbGDlFwPL37Ffaws', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var inputStream = fs.createReadStream('catalog.csv', 'utf8');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  user: "root",
  password: "root",
  database: "nodetest"
});

var count = 0;
var countPlaces = 0;
var connection = true;
var normalDates = 0;
var notNormalDates = 0;

var places = [];
//
// geoFire.get('White House, Washington').then(function(location) {
//   if (location === null) {
//     console.log("Provided key is not in GeoFire");
//   }
//   else {
//     console.log("Provided key has a location of " + location);
//   }
// }, function(error) {
//   console.log("Error: " + error);
// });
//
var geoQuery = geoFire.query({
  center: [51.5081, -0.0759],
  radius: 10
});
//
// console.log(geoQuery);
//
geoQuery.on("key_entered", function(key, location, distance) {
  count++;
  console.log("TEST");
  console.log(key + " entered query at " + location + " (" + distance + " km from center)");
  console.log(count);
});
//
// geoQuery.on("ready", function() {
//   geoQuery.cancel();
//   firebase.database().goOffline();
//   console.log("Ready");
// });
//console.log(onKeyEnteredRegistration);
// onKeyEnteredRegistration.cancel();
//geoQuery.cancel();


// inputStream
// 	.pipe(CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
// 	.on('data', function (row) {
//       count++;
//
//       // Set Name
//       var nameRaw = row[0].split(",");
//       var name;
//       if (nameRaw.length < 2) {
//         name = nameRaw[0].trim();
//       }else{
//         name = nameRaw[1].trim() + " " + nameRaw[0].trim();
//       }
//
//       // Set Born Date
//       var born = row[1].split(",");
//
//       // Set Born Location - location, locationCity, locationVenue
//       var location = row[5];
//
//       var locationRaw = row[5].split(",");
//       var locationCity;
//       //console.log("Location", locationRaw);
//       if (locationRaw.length < 2) {
//         locationCity = locationRaw[0].trim();
//       }else{
//         locationCity = locationRaw[1].trim();
//       }
//
//       if (born.length < 4) {
//         //console.log("not normal");
//         //console.log('Born', born);
//         notNormalDates++;
//       }else{
//         normalDates++;
//       }
//
//       // if (count > 42400 && location !== 'Private collection') {
//       //   geocoder.geocode(location, function(err, res) {
//       //     console.log('Location: ',location);
//       //     console.log(res);
//       //     var object = res[0];
//       //     console.log(object);
//       //   });
//       //}
//       // if (!contains.call(places, location) && location.startsWith("W")) {
//       //   var boolPlace = contains.call(places, location);
//       //   //console.log("Place exists", location);
//       //   places.push(location);
//       //   countPlaces++;
//       //   //var testLocation = [-16.130262, 153.605347];
//       //   // geoFire.set("location", testLocation).then(function() {
//       //   //   console.log("location initially set to [" + testLocation + "]");
//       //   // });
//       //   geocoder.geocode(location)
//       //   .then(function(res) {
//       //     //console.log('Location: ',location);
//       //     //console.log(res);
//       //     if (res.length > 0) {
//       //       var object = res[0];
//       //       var yourval = JSON.parse(JSON.stringify(object));
//       //       var testLocation = [yourval['latitude'], yourval['longitude']];
//       //       console.log(testLocation);
//       //       console.log(location);
//       //       geoFire.set(location, testLocation).then(function() {
//       //         console.log("location initially set to [" + testLocation + "]");
//       //       });
//       //     }
//       //   })
//       //   .catch(function(err) {
//       //     console.log(err);
//       //   });
//       // }
//       //console.log(name.toLowerCase() + ' in ' + location);
// 	    //console.log('A row arrived: ', row);
//       //console.log('Name', name);
//
// 	})
// 	.on('end', function (data) {
// 	    console.log('No more rows!');
//       console.log("Dates not normal", notNormalDates);
//       console.log("Dates normal", normalDates);
//       console.log("Count", count);
//       console.log("CountPlaces", countPlaces);
//       firebase.database().goOffline()
// 	});
//
//   var contains = function(needle) {
//       // Per spec, the way to identify NaN is that it is not equal to itself
//       var findNaN = needle !== needle;
//       var indexOf;
//
//       if(!findNaN && typeof Array.prototype.indexOf === 'function') {
//           indexOf = Array.prototype.indexOf;
//       } else {
//           indexOf = function(needle) {
//               var i = -1, index = -1;
//
//               for(i = 0; i < this.length; i++) {
//                   var item = this[i];
//
//                   if((findNaN && item !== item) || item === needle) {
//                       index = i;
//                       break;
//                   }
//               }
//
//               return index;
//           };
//       }
//
//       return indexOf.call(this, needle) > -1;
//   };

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//     connection = !connection;
//     con.end();
//   });
// });

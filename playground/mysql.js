var mysql = require('mysql');
var fs = require('fs');
var CsvReader = require('csv-reader');

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
var connection = true;
var normalDates = 0;
var notNormalDates = 0;

inputStream
	.pipe(CsvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
	.on('data', function (row) {
      count++;
      var nameRaw = row[0].split(",");
      var name;
      if (nameRaw.length < 2) {
        name = nameRaw[0].trim();
      }else{
        name = nameRaw[1].trim() + " " + nameRaw[0].trim();
      }

      var born = row[1].split(",");

      var locationRaw = row[5].split(",");
      var location;
      //console.log("Location", locationRaw);
      if (locationRaw.length < 2) {
        location = locationRaw[0].trim();
      }else{
        location = locationRaw[1].trim();
      }

      if (born.length < 4) {
        //console.log("not normal");
        //console.log('Born', born);
        notNormalDates++;
      }else{
        normalDates++;
      }
      console.log(name.toLowerCase() + ' in ' + location);
	    //console.log('A row arrived: ', row);
      //console.log('Name', name);

	})
	.on('end', function (data) {
	    console.log('No more rows!');
      console.log("Dates not normal", notNormalDates);
      console.log("Dates normal", normalDates);
	});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    connection = !connection;
    con.end();
  });
});

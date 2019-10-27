var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'gracen1331',
//   insecureAuth : true
// });

// var connection = mysql.createConnection({
//   host     : 'mysql://bba7090bbe2dde:b1237e3b@us-cdbr-iron-east-05.cleardb.net/heroku_e006ccfc8d8e81b?reconnect=true',
//   host     : 'mysql://bba7090bbe2dde:b1237e3b@us-cdbr-iron-east-05.cleardb.net/heroku_e006ccfc8d8e81b?reconnect=true',
//   user     : 'bba7090bbe2dde',
//   password : 'b1237e3b',
//   insecureAuth : true
// });

var connection = mysql.createConnection("mysql://bba7090bbe2dde:b1237e3b@us-cdbr-iron-east-05.cleardb.net/heroku_e006ccfc8d8e81b?reconnect=true");


// // Set the configuration for your app
// // TODO: Replace with your app's config object
// var firebaseConfig = {
//   apiKey: '<your-api-key>',
//   authDomain: '<your-auth-domain>',
//   databaseURL: '<your-database-url>',
//   storageBucket: '<your-storage-bucket-url>'
// };
// firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();

var w = "CREATE DATABASE IF NOT EXISTS join_us"
connection.query(w, function(err){
  if(err){
    throw err;
  }
  else{
    connection.query("USE join_us", function(err){
      if(err) throw err;
      else{
        connection.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100))", function(err){
          if(err) throw err;
        });
      }
    });
  }
});

app.get("/", function(req, res) {
    // Find count of users in DB
    var q = "SELECT * FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;

        var count = results.length
        var emails = results

        res.render("home", {
          count: count,
          emails: emails
        });
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Server running!");
});

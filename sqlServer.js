const express = require('express');
const  app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
app.use(cors());
const mysql = require('mysql');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const port = process.env.PORT || '4800';  //port setting
app.set('port', port);
app.listen(port, ()=> console.log(`Listening at localhost:${port}`));


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Temp!123",
  database: "employee_DB"
});

// create database
/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE employee_DB", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});*/

app.get('/employees', function (req, res) {
  con.query('select * from employees', function (error, results, fields) {
    if (error) { return console.error(error); }
    if(results) {
      console.log(results);
      res.end(JSON.stringify(results));
    }
  });
});

app.post('/employees', function (req, res) {
  const postData = req.body;
  con.query('insert into employees SET ?', postData, function (error, results, fields) {
    if (error) { return console.error(error); }
    if(results) {
      console.log("Data inserted");
      console.log(results);
      res.end(JSON.stringify(results));
    }
  });
});

app.put('/employees/:id', function (req, res) {
  console.log(req.body.id);
  const postData = req.body;
  // con.query('UPDATE employees SET name=?,mobile_no=?,department=?, designation=?,branch=?,landmark=?, age=?,state=?,address=?,pincode=? ,dob=?,gender=?,joined_date=?,id_proof=?,district=?,taluk=?  where id=?',
  con.query('UPDATE employees SET ? where id=?',[postData,req.body.id] , function (error,results) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//rest api to delete record from mysql database
app.delete('/employees/:id', function (req, res) {
  console.log(req.params.id);
  con.query('DELETE FROM `employees` WHERE `id`=?', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.end('Record has been deleted!');
  });
});
// create Table
/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE departments (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE designations (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255), department INT, FOREIGN KEY(department) REFERENCES departments(id))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/
 /*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql="CREATE TABLE employees (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255),mobile_no VARCHAR(255),department INT,FOREIGN KEY(department) REFERENCES departments(id),designation INT,FOREIGN KEY(designation) REFERENCES designations(id),branch VARCHAR(255),landmark VARCHAR(255),state VARCHAR(255), address VARCHAR(255),pincode VARCHAR(255),age INT(3), dob DATE, gender VARCHAR(20),joined_date DATE,id_proof VARCHAR(255),district VARCHAR(255), taluk VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/


/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE mode_of_travel (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE statuses (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE payment_mode (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255), description VARCHAR(255))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/


/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE travel_accommodations (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,departure_date DATETIME,departure_place VARCHAR(255),destination_date DATETIME,destination_place VARCHAR(255),department INT, FOREIGN KEY(department) REFERENCES departments(id),mode_of_travel INT, FOREIGN KEY(mode_of_travel) REFERENCES mode_of_travel(id), employee INT, FOREIGN KEY(employee) REFERENCES employees(id),purpose_of_travel  VARCHAR(500), accommodation BOOLEAN,check_in_date DATETIME,check_out_date DATETIME,payment_mode INT, FOREIGN KEY(payment_mode) REFERENCES payment_mode(id), food BOOLEAN, status INT, FOREIGN KEY(status) REFERENCES statuses(id))"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/





// create Record

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO employees (name,mobile_no,department,designation,employee_code,address,pincode,age,dob,gender,id_proof) VALUES ('Ranjitha G', '9875455557','1','1','V2C12516','omalur','636445','25','1994-01-02','Female','ueu45')"
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("records created");
  });
});*/
/*var sql = "CREATE TABLE employees (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,name VARCHAR(255),
mobile_no VARCHAR(255),
department INT, FOREIGN KEY(department) REFERENCES departments(id),
designation INT, FOREIGN KEY(designation) REFERENCES designations(id),
employee_code VARCHAR(255),
address VARCHAR(255),
pincode VARCHAR(255),
age INT(3),
dob DATE,
gender VARCHAR(20),
id_proof VARCHAR(255))"*/


//multiple record

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, description) VALUES ?";
  var values = [
    ['Finance', 'Finance'],
    ['Administration', 'Administration'],
    ['Analytics & IT', 'Analytics & IT']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});*/








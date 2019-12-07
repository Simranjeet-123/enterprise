const express = require('express');
const app = express();
app.use(express.json());
//welcome page
app.get('/',(req,res)=>{
res.send('welcome to mongonodejs page');
});
// show all the collections in mongo db 
app.get('/api/show_collections',(req,res)=>{
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

    if (err) throw err;

    const db = client.db("collegeDatabase");

    db.listCollections().toArray().then((docs) => {

        console.log('Available collections:');
        docs.forEach((doc, idx, array) => { console.log(doc.name) });

    }).catch((err) => {

        console.log(err);
    }).finally(() => {

        client.close();
    });
});
});


// get service to retrieve student collection data
app.get('/api/student',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";

      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("collegeDatabase");
      dbo.collection("student").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
  });
});

});
// get service to retrieve instructor collection data
app.get('/api/instructor',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";

      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("collegeDatabase");
      dbo.collection("instructor").find({}).toArray( function(err, result) {
      if (err) throw err;
     
      res.send(result);
      db.close();
  });
});

});


// post service to insert data into student collection data
app.post('/api/student1',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("collegeDatabase");
	  var myobj = { student_id:"209",student_name: "Mahir",student_phone:"9876541234",student_address:"Toronto",student_email:"mahir@gmail",courses_taken:[103,105]};
	  dbo.collection("student").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted into student collection");
	    
	  });
});
});

// post service to insert data into instructor collection data
app.post('/api/instructor1',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("collegeDatabase");
	  var myobj = { instructor_id: "408",instructor_name: "Mehar Sharma",course_id:[104,102]};
	  dbo.collection("instructor").insertOne(myobj, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted into instructor collection");
	    
	  });
});
});	

// put service to update data into student collection data
app.put('/api/student2',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("collegeDatabase");
   var myquery = { student_name: "Mahir" };
   var newvalues = { $set: {student_id: "209", student_name:"Mahir Malik" } };
   dbo.collection("student").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});	

// put service to update data in instructor collection data
app.put('/api/instructor2',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("collegeDatabase");
   var myquery = { instructor_name: "Mehar Sharma" };
   var newvalues = { $set: {student_id: "408", instructor_name:"Mehar" } };
   dbo.collection("instructor").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});	

app.delete('/api/deleteStudent',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("collegeDatabase");
   var myquery = { student_id:"209" };
   dbo.collection("student").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted from student collection");
	res.send("1 document deleted from student collection")
    db.close();
  });
});
});

app.delete('/api/deleteInstructor',(req,res)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("collegeDatabase");
   var myquery = { instructor_id: "408" };
   dbo.collection("instructor").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    res.send("1 document deleted from instructor collection");
    db.close();
  });
});
});

// Get using parameter

app.get('/api/student/:student_id', (req, res) => {
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("collegeDatabase");
      dbo.collection("student").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);    
 const student1=result;
const stu = student1.find( c=> c.student_id === (req.params.student_id));
if(!stu) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
res.send(stu);
});
 });
});
// Get using parameter
app.get('/api/instructor/:instructor_name', (req, res) => {
var MongoClient = require('mongodb').MongoClient;
      var url ="mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("collegeDatabase");
      dbo.collection("instructor").find({}).toArray( function(err, result) {
      if (err) throw err;
      console.log(result);    
 const instructor1=result;
const inst = instructor1.find( c=> c.instructor_name === (req.params.instructor_name));
if(!inst) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
res.send(inst);
});
 });
});


const port=process.env.PORT || 8085;
app.listen(port,() => console.log(`listening on port ${port}..`));

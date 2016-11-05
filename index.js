'use strict';

var express = require('express');
var morgan = require('morgan');
var mysql = require('mysql');
var app = express();

app.use(morgan('short'));

var PORT = 5000;

var databaseName = 'ma_2016';

//database connect
var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'yuta0730',
	database:'ma_2016'
});
connection.connect(function(error) {
	if (error) {
		console.log('error connecting: ' + error.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

// ユーザ登録
function createUser(id, gender, age) {	
	var insertQuery = 'insert into Users (id, gender, age) values ('+id+",'"+gender+"',"+age+');';
	connection.query(insertQuery, function(err, rows, fields) {
		if (err) {
			console.log('create User err: ' + err);

			return 'error'
		}
		return 'ok';
	});
}
// ユーザの登録したネタを持ってくる
function getUserInfo(id) {
	var query = "insert into Users(id,gender,age) ";
	query += "values("+ id + ",'" + gender + "'," + age + ")";

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log('get user info err: ' + err);
			return 'error';
		}
		console.log('name: ' + rows[0].name);
		console.log('id: ' + rows[0].id);

		return 'ok';
	});
}
// ユーザのネタを登録する
function registerStory(id, story) {
	// insert into Storys(id, story) values(123, ‘話のネタ’);
	var insertQuery = "insert into Storys(id,story) ";
	insertQuery += "values("+ id +",'"+ story +"');";

	connection.query(insertQuery, function(err, rows, fields) {
		if (err)  {
			console.log('register story err: ' + err);

			return 'error';
		}
		return 'ok';
	});
}

app.post("/api/createUser", function(req, res) {
	var data ='';
	req.on('data', function(chunk) {
		data += chunk;
	});
	req.on('end', function() {
		var json = JSON.parse(data);
		var human = json['Human'];
		var id = human['ID'];
		var gender = human['Gender'];
		var age =human['Age'];

		var result = createUser(id, gender, age);
		console.log('result: ' + result);
	});

	res.contentType('application/json');
	res.end(JSON.stringify({"msg":"200 OK"}));
});

app.post("/api/getUserInfo", function(req, res) {
	console.log(req.body);
	res.contentType('application/json');
	var json = {
		"msg":"トイレットペーパーはこれくらいの長さ"
	};

	res.end(JSON.stringify(json));
});

app.post('/api/RegisterStory', function(req, res) {
	var data = '';
	req.on('data',function(chunk) {
		data += chunk;
	});
	req.on('end', function() {
		var json = JSON.parse(data);
		var id = json['ID'];
		var story = json['story'];

		var result = registerStory(id, story);

		console.log('result : ' + result);
	});

	res.contentType('application/json');
	res.end(JSON.stringify({'msg':'200 OK'}));
});

var server = app.listen(PORT, function() {
	console.log('running post :' + PORT);
});
// register story
// curl -X POST -d '{"ID":"123","story":"トイレットペーパー"}' http://192.168.3.70:5000/api/RegisterStory


// curl -X POST -d '{"Human":{"ID":"123","Gender":"Male","Age":"21"}}' http://192.168.3.70:5000/api/createUser
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
// ユーザの登録したネタを持ってくる
var getUserStory = function(id, callback) {
	var query = 'select story from storys where id='+id+';';

	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log('get user info err: ' + err);
		}
		// return rows;
		callback(rows);
	});
}

var decodeJson = function(req, callback) {
	var data = '';
	req.on('data', function(chunk) {
		data += chunk;
	});
	req.on('end', function() {
		callback(JSON.parse(data));
	});
}

app.post("/api/createUser", function(req, res) {

	decodeJson(req, function(json) {
		var human = json['Human'];
		var id = human['ID'];
		var gender = human['Gender'];
		var age = human['Age'];
		var result = createUser(id, gender, age);
		console.log(result);
	});

	res.contentType('application/json');
	res.end(JSON.stringify({"msg":"200 OK"}));
});

app.post("/api/getUserStory", function(req, res) {

	decodeJson(req, function(json) {
		var id = json['ID'];
		getUserStory(id, function(results) {
			res.contentType('application/json');
			var obj = [];
			for (var i = 0; i < results.length; i++) {
				var story = results[i]['story'];
				console.log(story);
				obj.push(story);
			}
			var jsonObj = {
				story: obj
			};
			var jsonStr = JSON.stringify(jsonObj);
			res.end(jsonStr);
		});
	});
	// var data = '';
	// req.on('data', function(chunk) {
	// 	data += chunk;
	// });
	// req.on('end', function() {
	// 	var jsonData = JSON.parse(data);
	// 	var id = jsonData['ID'];
	// 	getUserStory(id, function(results) {
	// 		// res.send(results);
	// 		// console.log(results);
	// 		res.contentType('application/json');
	// 		var obj = [];
	// 		for (var i = 0;i < results.length; i++) {
	// 			console.log(results[i]['story']);
	// 			obj.push(results[i]['story']);
	// 		}
	// 		var json = {
	// 			story:obj
	// 		};
	// 		console.log(json);
	// 		var jsonStr = JSON.stringify(json);
	// 		console.log(jsonStr['story']);
	// 		res.end(JSON.stringify(jsonStr));
	// 	});
	// });
});

app.post('/api/RegisterStory', function(req, res) {
	decodeJson(req, function(json) {
		var id = json['ID'];
		var story = json['Story'];
		var result = registerStory(id, story);
		console.log('result : ' + result);
	});

	res.contentType('application/json');
	res.end(JSON.stringify({'msg':'200 OK'}));
});

var server = app.listen(PORT, function() {
	console.log('running post :' + PORT);
});

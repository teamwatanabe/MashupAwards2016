'use strict';

var express = require('express');
var morgan = require('morgan');
var mysql = require('mysql');
var app = express();

app.use(morgan('short'));

var PORT = 5000;
var DBNAME = 'ma_2016';

var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'yuta0730',
	database:DBNAME
});
connection.connect(function(error) {
	if (error) {
		console.log('error connecting: ' + error.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

// ユーザ登録
var createUser = function(id, gender, age, callback) {
	var insertQuery = 'insert into Users (id, gender, age) values ('+id+",'"+gender+"',"+age+');';
	connection.query(insertQuery, function(err, rows, fields) {
		callback(err, rows);
	});
}
// ユーザのネタを登録する
var registerStory = function(id, story, callback) {
	var insertQuery = "insert into Storys(id,story) ";
	insertQuery += "values("+ id +",'"+ story +"');";

	connection.query(insertQuery, function(err, rows, fields) {
		if (err)  {
			console.log('register story err: ' + err);
		}
		callback(err, rows);
	});
}
// ユーザの登録したネタを持ってくる
var getUserStory = function(id, callback) {
	var query = 'select story from storys where id='+id+';';
	connection.query(query, function(err, rows, fields) {
		if (err) {
			console.log('get user info err: ' + err);
		}
		callback(err, rows);
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
		createUser(id, gender, age, function(err, results) {
			if (err) {
				console.log('create User err: ' + err);
				res.contentType('application/json');
				res.end(JSON.stringify({"msg":"400 missing"}));
			} else {
				res.contentType('application/json');
				res.end(JSON.stringify({"msg":"200 OK"}));
			}
		});
	});
});

app.post("/api/getUserStory", function(req, res) {
	decodeJson(req, function(json) {
		var id = json['ID'];
		getUserStory(id, function(error, results) {
			if (error) {
				res.contentType('application/json');
				res.end(JSON.stringify({'msg':'400 Missing'}));
			} else {
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
			}
		});
	});
});

app.post('/api/RegisterStory', function(req, res) {
	decodeJson(req, function(json) {
		var id = json['ID'];
		var story = json['Story'];
		console.log(id);
		console.log(story);
		registerStory(id, story, function(error, results) {
			if (error) {
				res.contentType('application/json');
				res.end(JSON.stringify({'msg':'400 Missing'}));
			} else {
				res.contentType('application/json');
				res.end(JSON.stringify({'msg':'200 OK'}));
			}
		});
	});
});

var server = app.listen(PORT, function() {
	console.log('running post :' + PORT);
});
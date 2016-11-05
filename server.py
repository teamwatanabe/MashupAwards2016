#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import socket
from flask import Flask, request, redirect, url_for, abort, jsonify
from flask_restful import Resource, Api
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)

@app.route('/api/FaceRecognization', methods=['POST'])
def post(self):

	# stub
	return json.dumps({'msg':'response message'})

	if request.headers['Content-Type'] != 'application/json':
		print(request.headers['Content-Type'])
		return flask.jsonify(res='error'), 400

	print(request.json)

	return flask.jsonify(res='ok')


if __name__ == '__main__':
	ip = socket.gethostbyname(socket.gethostname())
	app.debug = True
	app.run(host=ip)
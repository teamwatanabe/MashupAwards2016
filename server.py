#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import socket
from flask import Flask, request, redirect, url_for, abort, jsonify
from flask_restful import Resource, Api
from werkzeug.utils import secure_filename

app = Flask(__name__)

api = Api(app)

class FaceRecognization(Resource):
	def post(self):
		return json.dumps({'msg':'response message'})

	def get(self):
		return 'No Allow Method'

api.add_resource(FaceRecognization, '/api/FaceRecognization')

if __name__ == '__main__':
	ip = socket.gethostbyname(socket.gethostname())
	app.debug = True
	app.run(host=ip)
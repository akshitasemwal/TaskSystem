from flask import jsonify, request, Flask
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 

mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/TaskListDB")
db = mongodb_client.db

@app.route('/tasks', methods=["POST"])
def add_task():
    task = request.json
    print("Received Task:", task)
    if not task:
        return jsonify({"error": "No data received"}), 400
    db.tasklist.insert_one(task)
    return jsonify({"msg": "Task added successfully!"}), 201

@app.route('/tasks', methods=["GET"])
def get_task():
    tasks = list(db.tasklist.find())
    for task in tasks:
        task['_id'] = str(task['_id'])
    return jsonify(tasks), 201

app.run(debug = True)
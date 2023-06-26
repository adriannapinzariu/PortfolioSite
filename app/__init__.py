from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/home')
def home():
    return jsonify({"message": "Connected successfully"})

@app.route('/')
def index():
    response_body = {
        "msg": "Successfully Connected!!"
    }
    return jsonify(response_body)

@app.route('/hobby')
def get_hobby():
    response_body = [
   {
            "name": "Game",
            "img": "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            "name": "Surfing",
            "img": "https://images.pexels.com/photos/67386/pexels-photo-67386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            "name": "Chess",
            "img": "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"


        }
    ]
    return jsonify(response_body)

@app.route('/experience')
def get_experience():
    response_body = [
        {
            "title": "Senior Software Developer at XYZ Corp",
            "time": "2023-Present",
            "responsibilities": "Lead a team of developers to maintain and enhance the company website. Implemented agile development methodologies to improve productivity"
        },
        {
            "title": "Software Developer at ABC Inc",
            "time": "2020-2023",
            "responsibilities": "Worked as part of a team to maintain and enhance the company website. Implemented agile development methodologies to improve productivity"
        }
    ]
    return jsonify(response_body)
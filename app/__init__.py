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


@app.route('/location')
def get_location():
    response_body = [
        {"country": "Canada", "lat": 45.421532, "long": -75.697189},
        {"country": "Canada", "lat": 45.421532, "long": -75.697189},
        {"country": "Mexico", "lat": 19.432608, "long": -99.133209},
        {"country": "US", "lat": 38.9071923, "long": -77.0368707},
        {"country": "UK", "lat": 51.509865, "long": -0.118092},
        {"country": "France", "lat": 48.864716, "long": 2.349014},
        {"country": "Spain", "lat": 40.416775, "long": -3.703790},
        {"country": "Japan", "lat": 36.2048, "long": 138.2529},
        {"country": "Tunisia", "lat": 33.8869, "long": 9.5375},
        {"country": "South Korea", "lat": 35.9078, "long": 127.7669},
    ]
    return jsonify(response_body)

from peewee import *
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os
import datetime
from playhouse.shortcuts import model_to_dict
from playhouse.db_url import connect

app = Flask(__name__)
CORS(app)

from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(__file__), '..', 'example.env')
load_dotenv(dotenv_path=env_path)

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")

DATABASE_URL = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
mydb = connect(DATABASE_URL)

class TimelinePost(Model):
    name = CharField()
    email = CharField()
    content = TextField()
    created_at = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = mydb  

try:
    mydb.connect()
    mydb.create_tables([TimelinePost])
except Exception as e:
    print(f"Error while connecting to the database or creating tables: {e}")



@app.route('/home')
def home():
    return jsonify({"message": "Connected successfully. Making a small change to site."})


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
            "responsibility": ["Lead a team of developers to maintain and enhance the company website", "Implemented agile development methodologies to improve productivity"],
            "achievement": ["Redesigned the company website, increasing traffic by 30%", "Developed an automated testing suite, reducing bugs by 15%"]
        }, 
        {
            "title": "Software Developer at ABC Inc",
            "time": "2020-2023",
            "responsibility": ["Worked as part of a team to maintain and enhance the company website", "Implemented agile development methodologies to improve productivity"],
            "achievement": ["Redesigned the company website, increasing traffic by 30%", "Developed an automated testing suite, reducing bugs by 15%"]
        },
        {
            "title": "Junior Software Developer at DEF Ltd",
            "time": "2020-2023",
            "responsibility": ["Worked as part of a team to maintain and enhance the company website", "Implemented agile development methodologies to improve productivity"],
            "achievement": ["Redesigned the company website, increasing traffic by 30%", "Developed an automated testing suite, reducing bugs by 15%"]
        }
    ]
    return jsonify(response_body)

@app.route('/education')
def get_education():
    response_body = [
        {
            "title": "MSc in Computer Science, University of Example",
            "time": "2016-2018",
            "coursework": ["Advanced Algorithms", "Distributed Systems"],
        }, 
        {
            "title": "BSc in Computer Science, University of Example",
            "time": "2012-2016",
            "coursework": ["Data Structures", "Computer Networks"],
        }, 

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

@app.route('/timeline')
def timeline():
    posts = TimelinePost.select().order_by(TimelinePost.created_at.desc())
    return render_template('timeline.html', title="Timeline", posts=posts)

@app.route('/api/timeline_post', methods=['POST'])
def post_time_line_post():
    try:
        data = request.get_json()

        name = data['name']
        email = data['email']
        content = data['content']

        if name is None or email is None or content is None:
            return jsonify({"error": "Missing field"}), 400

        timeline_post = TimelinePost.create(name=name, email=email, content=content)

        return model_to_dict(timeline_post)
    except Exception as e:
        return jsonify({"error": "Error while creating a new post: " + str(e)}), 500

@app.route('/api/timeline_post', methods=['GET'])
def get_time_line_post():
    return {
        'timeline_posts': [
            model_to_dict(p)
            for p in TimelinePost.select().order_by(TimelinePost.created_at.desc())
        ]
    }

@app.route("/api/timeline_post/<int:id>", methods=["DELETE"])
def delete_timeline_post(id):
    query = TimelinePost.delete().where(TimelinePost.id == id)
    deleted_count = query.execute()

    if deleted_count == 0:
        return jsonify({"message": "Post did not exist"}), 200
    else:
        return jsonify({"success": "Post was successfully deleted"}), 200

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)

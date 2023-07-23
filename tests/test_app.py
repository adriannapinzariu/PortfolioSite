import unittest
import datetime
from dateutil.parser import parse
import json
import os
os.environ['TESTING'] = 'true'

from app import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_home(self):
        response = self.client.get('/home')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)

        assert "message" in data
        self.assertEqual(data["message"], "Connected successfully. Making a small change to site.")

        assert "server_time" in data
        try:
            parse(data["server_time"])
        except ValueError:
            self.fail("server_time is not a valid ISO 8601 date")

        assert "database_status" in data
        self.assertTrue(data["database_status"], "Database connection failed.")

        assert "api_version" in data
        self.assertEqual(data["api_version"], "1.0")

        assert "welcome_message" in data
        self.assertEqual(data["welcome_message"], "Welcome to my portfolio site")

    def test_timeline(self):
        response = self.client.get('/api/timeline_post')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.is_json)
        data = response.get_json()
        self.assertIn("timeline_posts", data)
        self.assertEqual(len(data['timeline_posts']), 0)
            
        response = self.client.post('/api/timeline_post', json={
            'name': 'Taylor Swift',
            'email': 'tswift@example.com',
            'content': 'Shake it off! Shake it off! Ah ah ah ahh!'
        })
        self.assertEqual(response.status_code, 200)

        response = self.client.get('/api/timeline_post')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data['timeline_posts']), 1)
        self.assertEqual(data['timeline_posts'][0]['name'], 'Taylor Swift')
        self.assertEqual(data['timeline_posts'][0]['email'], 'tswift@example.com')
        self.assertEqual(data['timeline_posts'][0]['content'], 'Shake it off! Shake it off! Ah ah ah ahh!')

        response = self.client.post('/api/timeline_post', json={
            'name': 'Adrianna Pinzariu',
            'email': 'adriannapinzariu@gmail.com',
            'content': 'Currently Coding!'
        })
        self.assertEqual(response.status_code, 200)

        # GET method test 2: Verifying both posts were created
        response = self.client.get('/api/timeline_post')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data['timeline_posts']), 2)
        self.assertEqual(data['timeline_posts'][0]['name'], 'Adrianna Pinzariu')
        self.assertEqual(data['timeline_posts'][0]['email'], 'adriannapinzariu@gmail.com')
        self.assertEqual(data['timeline_posts'][0]['content'], 'Currently Coding!')


    def test_malformed_timeline_post(self):
        # POST request missing name
        response = self.client.post(
            '/api/timeline_post',
            json={
                'name': "",
                'email': 'john@example.com',
                'content': "Hello world, I'm John!"
            },
        )
        assert response.status_code == 400
        response_data = response.get_json()  
        print(response_data) 
        assert response_data.get('error') == "Invalid name"

        # POST request with empty content
        response = self.client.post(
            '/api/timeline_post',
            json={
                'name': 'John Doe',
                'email': 'john@example.com',
                'content': ""
            },
        )
        assert response.status_code == 400

        response_data = response.get_json()  
        print(response_data) 
        assert response_data.get('error') == "Invalid content"

        # POST request with malformed email
        response = self.client.post(
            '/api/timeline_post',
            json={
                'name': 'John Doe',
                'email': 'not-an-email',
                'content': "Hello world, I'm John!"
            },
        )
        assert response.status_code == 400

        response_data = response.get_json()  
        print(response_data) 
        assert response_data.get('error') == "Invalid email"
        
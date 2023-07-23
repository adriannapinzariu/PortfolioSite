import unittest
import json
import os
os.environ['TESTING'] = 'true'

from app import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_home(self):
        response = self.client.get('/home')
        data = json.loads(response.data)
        assert "message" in data
        # TODO: Add more tests relating to the home page

    def test_timeline(self):
        response = self.client.get('/api/timeline_post')
        assert response.status_code == 200
        assert response.is_json
        json = response.get_json()
        assert "timeline_posts" in json
        assert len(json['timeline_posts']) == 0
        # TODO: Add more tests relating to /api/timeline_post GET and POST apis
        # TODO: Add more tests relating to the timeline page

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
        
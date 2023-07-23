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
        
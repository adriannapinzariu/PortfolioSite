# tests.py
import unittest
from peewee import *

from app import TimelinePost

MODELS = [TimelinePost]

# use an in-memory SQLite for tests.
test_db = SqliteDatabase(':memory:')

class TestTimelinePost(unittest.TestCase):
    def setUp(self):
        try:
            # Bind model classes to test db.
            test_db.bind(MODELS, bind_refs=False, bind_backrefs=False)
            
            # Try connecting to the database.
            test_db.connect()

            # Ensure the connection is open.
            assert test_db.is_closed() == False, 'Database should be open.'
            
            # Create tables.
            test_db.create_tables(MODELS)
            
            # Ensure the table exists.
            assert test_db.table_exists('timelinepost'), 'Table should exist.'
            
        except Exception as e:
            print(f"Error while setting up the test database: {e}")
            raise

            

    def tearDown(self):
        # Not strictly necessary since SQLite in-memory databases only live
        # for the duration of the connection, and in the next step we close
        # the connection...but a good practice all the same.
        test_db.drop_tables(MODELS)

        # Close connection to db.
        test_db.close()

        # If we wanted, we could re-bind the models to their original
        # database here. But for tests this is probably not necessary.

    def test_timeline_post(self):
        first_post = TimelinePost.create(name='John Doe', email='john@example.com', content='Hello world, I\'m John!')
        assert first_post.id == 1
        second_post = TimelinePost.create(name='Jane Doe', email='jane@example.com', content='Hello world, I\'m Jane!')
        assert second_post.id == 2

        #TODO: Get timelineposts and assert that they are correct
        posts = TimelinePost.select().order_by(TimelinePost.created_at.desc())
        posts = list(posts)

        assert len(posts) == 2
        assert posts[0].name == 'Jane Doe'
        assert posts[0].email == 'jane@example.com'
        assert posts[0].content == 'Hello world, I\'m Jane!'
        assert posts[1].name == 'John Doe'
        assert posts[1].email == 'john@example.com'
        assert posts[1].content == 'Hello world, I\'m John!'
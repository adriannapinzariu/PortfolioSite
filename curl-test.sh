#!/bin/bash

API_URL="http://127.0.0.1:5000/api/timeline_post"
HEADER_CONTENT="Content-Type: application/json"
POST_CONTENT="Test content $(date)"

POST_RESPONSE=$(curl --silent --request POST --url $API_URL --header "$HEADER_CONTENT" --data "{\"name\": \"Adrianna\", \"email\": \"adriannapinzariu@gmail.com\", \"content\": \"$POST_CONTENT\"}")
POST_ID=$(echo $POST_RESPONSE | jq '.id')
echo "Post response: $POST_RESPONSE"

echo "Created post with ID: $POST_ID"

GET_RESPONSE=$(curl --silent --request GET --url $API_URL)
if echo $GET_RESPONSE | jq '.timeline_posts[] | .id' | grep -q $POST_ID; then
    echo "The new post has been successfully added"
else
    echo "Failed to add the new post"
fi

DELETE_RESPONSE=$(curl --silent --request DELETE --url "$API_URL/$POST_ID")
echo "Delete response: $DELETE_RESPONSE"
if [[ $DELETE_RESPONSE == *"Post was successfully deleted"* ]]; then
    echo "The post was successfully deleted"
else
    echo "Failed to delete the post"
fi

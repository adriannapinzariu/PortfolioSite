#!/bin/bash

tmux kill-server
cd /root/PortfolioSite/app
git fetch && git reset --hard origin/main
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install setuptools_rust
pip install -r ../requirements.txt
sudo dnf install python3-pip
tmux new-session -d -s flask_session
tmux send-keys -t flask_session 'source venv/bin/activate' C-m
tmux send-keys -t flask_session 'export FLASK_APP=__init__.py' C-m
tmux send-keys -t flask_session 'flask run --host=0.0.0.0' C-m




#!/bin/bash
set -e

cd /root/PortfolioSite
git fetch && git reset --hard origin/main

source python3-virtualenv/bin/activate
pip install -r requirements.txt
deactivate

sudo systemctl restart myportfolio


#!/bin/bash
set -e

cd /root/PortfolioSite
git fetch && git reset --hard origin/main

#source python3-virtualenv/bin/activate
#pip install -r requirements.txt
#deactivate


sudo systemctl restart myportfolio

docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build

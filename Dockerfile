FROM python:3.9-slim-buster

RUN apt-get update && apt-get install -y default-mysql-client && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /PortfolioSite

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

#COPY wait-mysql.sh /PortfolioSite/wait-mysql.sh
#RUN chmod +x /PortfolioSite/wait-mysql.sh

CMD ["python", "app/__init__.py", "--host=0.0.0.0"]

EXPOSE 5000





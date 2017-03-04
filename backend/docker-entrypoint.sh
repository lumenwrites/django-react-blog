#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
python3.5 manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000

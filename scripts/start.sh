#!/bin/bash

# Personal Finance Manager Start Script
# This script starts both the backend and frontend servers

echo "Starting Personal Finance Manager..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Start backend server
echo "Starting backend server..."
cd backend
pm2 start src/server.js --name "pfm-backend"
cd ..

# Start frontend server
echo "Starting frontend server..."
cd frontend
pm2 start "npm start" --name "pfm-frontend"
cd ..

echo "Personal Finance Manager started successfully!"
echo "Backend running on port 5000"
echo "Frontend running on port 3001"
echo "Access the application at http://localhost:3001"

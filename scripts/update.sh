#!/bin/bash

# Personal Finance Manager Update Script
# This script updates the application with the latest changes

echo "Starting Personal Finance Manager update..."

# Pull latest changes from repository
echo "Pulling latest changes from repository..."
git pull

# Update backend dependencies
echo "Updating backend dependencies..."
cd backend
npm install
cd ..

# Update frontend dependencies
echo "Updating frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Restart services
echo "Restarting services..."
pm2 restart all

echo "Update completed successfully!"

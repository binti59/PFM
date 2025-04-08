#!/bin/bash

# Personal Finance Manager Installation Script
# This script installs all dependencies and sets up the application

echo "Starting Personal Finance Manager installation..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v)
echo "npm version: $NPM_VERSION"

# Create necessary directories if they don't exist
mkdir -p logs

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Setup environment variables
echo "Setting up environment variables..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Backend .env file created from example."
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "Frontend .env file created from example."
fi

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

echo "Installation completed successfully!"
echo "To start the application, run: ./scripts/start.sh"

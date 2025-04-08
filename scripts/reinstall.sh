#!/bin/bash

# Personal Finance Manager Re-installation Script
# This script completely removes the existing installation and performs a fresh install

echo "Starting Personal Finance Manager re-installation..."

# Confirm with the user
echo "WARNING: This will completely remove the existing installation and perform a fresh install."
echo "All data will be lost if not backed up."
read -p "Are you sure you want to continue? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Re-installation cancelled."
    exit 1
fi

# Stop all services
echo "Stopping all services..."
if command -v pm2 &> /dev/null; then
    pm2 stop all
fi

# Remove node_modules and build directories
echo "Removing existing dependencies and build files..."
rm -rf backend/node_modules
rm -rf frontend/node_modules
rm -rf frontend/build

# Remove environment files
echo "Removing environment files..."
rm -f backend/.env
rm -f frontend/.env

# Remove logs
echo "Removing logs..."
rm -rf logs/*

# Run the installation script
echo "Running fresh installation..."
./scripts/install.sh

echo "Re-installation completed successfully!"
echo "To start the application, run: ./scripts/start.sh"

#!/bin/bash

# Personal Finance Manager - Installation Script
# This script sets up the Personal Finance Manager application

# Exit on error
set -e

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display messages
log() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Display banner
display_banner() {
  echo -e "${BLUE}"
  echo "============================================================"
  echo "          Personal Finance Manager - Installation           "
  echo "============================================================"
  echo -e "${NC}"
  echo "This script will install and set up the Personal Finance"
  echo "Manager application on your system."
  echo ""
}

# Check system requirements
check_requirements() {
  log "Checking system requirements..."
  
  # Check if Node.js is installed
  if ! command_exists node; then
    log_error "Node.js is not installed. Please install Node.js before continuing."
    exit 1
  fi
  
  # Check Node.js version
  NODE_VERSION=$(node -v | cut -d 'v' -f 2)
  NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)
  if [ "$NODE_MAJOR_VERSION" -lt 14 ]; then
    log_warning "Node.js version $NODE_VERSION detected. Version 14 or higher is recommended."
  else
    log_success "Node.js version $NODE_VERSION detected."
  fi
  
  # Check if npm is installed
  if ! command_exists npm; then
    log_error "npm is not installed. Please install npm before continuing."
    exit 1
  fi
  
  # Check npm version
  NPM_VERSION=$(npm -v)
  log_success "npm version $NPM_VERSION detected."
  
  # Check if MongoDB is installed
  if command_exists mongod; then
    MONGO_VERSION=$(mongod --version | grep "db version" | cut -d 'v' -f 2)
    log_success "MongoDB version $MONGO_VERSION detected."
  else
    log_warning "MongoDB is not installed. You will need to install MongoDB or use a cloud MongoDB service."
  fi
  
  log_success "System requirements check completed."
}

# Install dependencies
install_dependencies() {
  log "Installing dependencies..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Install backend dependencies
  log "Installing backend dependencies..."
  cd backend
  npm install
  log_success "Backend dependencies installed."
  
  # Install frontend dependencies
  log "Installing frontend dependencies..."
  cd ../frontend
  npm install
  log_success "Frontend dependencies installed."
  
  cd ..
  log_success "All dependencies installed."
}

# Configure environment
configure_environment() {
  log "Configuring environment..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Configure backend environment
  if [ ! -f backend/.env ]; then
    log "Creating backend .env file..."
    cp backend/.env.example backend/.env
    log_success "Backend .env file created."
  else
    log_warning "Backend .env file already exists. Skipping."
  fi
  
  # Configure frontend environment
  if [ ! -f frontend/.env ]; then
    log "Creating frontend .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > frontend/.env
    log_success "Frontend .env file created."
  else
    log_warning "Frontend .env file already exists. Skipping."
  fi
  
  log_success "Environment configured."
}

# Build the application
build_application() {
  log "Building the application..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Build backend
  log "Building backend..."
  cd backend
  npm run build
  log_success "Backend built."
  
  # Build frontend
  log "Building frontend..."
  cd ../frontend
  npm run build
  log_success "Frontend built."
  
  cd ..
  log_success "Application built successfully."
}

# Main function
main() {
  display_banner
  
  # Ask for confirmation
  read -p "Do you want to proceed with the installation? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Installation cancelled."
    exit 0
  fi
  
  check_requirements
  install_dependencies
  configure_environment
  build_application
  
  log_success "Installation completed successfully!"
  echo ""
  echo "To start the backend server, run: cd backend && npm run dev"
  echo "To start the frontend development server, run: cd frontend && npm start"
  echo ""
  echo "Thank you for installing the Personal Finance Manager!"
}

# Run main function
main

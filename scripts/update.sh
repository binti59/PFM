#!/bin/bash

# Personal Finance Manager - Update Script
# This script updates an existing installation of the Personal Finance Manager application

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

# Display banner
display_banner() {
  echo -e "${BLUE}"
  echo "============================================================"
  echo "          Personal Finance Manager - Update                 "
  echo "============================================================"
  echo -e "${NC}"
  echo "This script will update your existing installation of the"
  echo "Personal Finance Manager application."
  echo ""
}

# Check if application is installed
check_installation() {
  log "Checking existing installation..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Check if backend and frontend directories exist
  if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    log_error "Application is not properly installed. Please run install.sh first."
    exit 1
  fi
  
  # Check if package.json exists in both directories
  if [ ! -f "backend/package.json" ] || [ ! -f "frontend/package.json" ]; then
    log_error "Application files are missing. Please run install.sh first."
    exit 1
  fi
  
  log_success "Installation check completed."
}

# Backup current installation
backup_installation() {
  log "Backing up current installation..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Create backup directory
  BACKUP_DIR="../pfm_backup_$(date +%Y%m%d%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  
  # Copy files to backup directory
  cp -r backend "$BACKUP_DIR/"
  cp -r frontend "$BACKUP_DIR/"
  cp -r scripts "$BACKUP_DIR/"
  
  log_success "Installation backed up to $BACKUP_DIR"
}

# Update dependencies
update_dependencies() {
  log "Updating dependencies..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Update backend dependencies
  log "Updating backend dependencies..."
  cd backend
  npm update
  log_success "Backend dependencies updated."
  
  # Update frontend dependencies
  log "Updating frontend dependencies..."
  cd ../frontend
  npm update
  log_success "Frontend dependencies updated."
  
  cd ..
  log_success "All dependencies updated."
}

# Pull latest changes
pull_latest_changes() {
  log "Pulling latest changes..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Check if git is initialized
  if [ -d ".git" ]; then
    git pull
    log_success "Latest changes pulled from repository."
  else
    log_warning "Git repository not initialized. Skipping pull."
  fi
}

# Rebuild the application
rebuild_application() {
  log "Rebuilding the application..."
  
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
  log_success "Application rebuilt successfully."
}

# Main function
main() {
  display_banner
  
  # Ask for confirmation
  read -p "Do you want to proceed with the update? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Update cancelled."
    exit 0
  fi
  
  check_installation
  
  # Ask for backup
  read -p "Do you want to backup the current installation? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    backup_installation
  else
    log_warning "Skipping backup. Proceeding at your own risk."
  fi
  
  pull_latest_changes
  update_dependencies
  rebuild_application
  
  log_success "Update completed successfully!"
  echo ""
  echo "To start the backend server, run: cd backend && npm run dev"
  echo "To start the frontend development server, run: cd frontend && npm start"
  echo ""
}

# Run main function
main

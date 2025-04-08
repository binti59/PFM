#!/bin/bash

# Personal Finance Manager - Reinstallation Script
# This script performs a clean reinstallation of the Personal Finance Manager application

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
  echo "       Personal Finance Manager - Reinstallation            "
  echo "============================================================"
  echo -e "${NC}"
  echo "This script will perform a clean reinstallation of the"
  echo "Personal Finance Manager application."
  echo ""
  echo "WARNING: This will remove the existing installation and"
  echo "all local changes will be lost."
  echo ""
}

# Check if application is installed
check_installation() {
  log "Checking existing installation..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Check if backend and frontend directories exist
  if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    log_warning "Application does not appear to be properly installed."
    read -p "Do you want to proceed with a fresh installation? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      log "Reinstallation cancelled."
      exit 0
    fi
  else
    log_success "Existing installation found."
  fi
}

# Backup current installation
backup_installation() {
  log "Backing up current installation..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Create backup directory
  BACKUP_DIR="../pfm_backup_before_reinstall_$(date +%Y%m%d%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  
  # Copy files to backup directory if they exist
  if [ -d "backend" ]; then
    cp -r backend "$BACKUP_DIR/"
  fi
  
  if [ -d "frontend" ]; then
    cp -r frontend "$BACKUP_DIR/"
  fi
  
  if [ -d "scripts" ]; then
    cp -r scripts "$BACKUP_DIR/"
  fi
  
  log_success "Installation backed up to $BACKUP_DIR"
}

# Remove existing installation
remove_installation() {
  log "Removing existing installation..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Remove directories
  if [ -d "backend" ]; then
    rm -rf backend
  fi
  
  if [ -d "frontend" ]; then
    rm -rf frontend
  fi
  
  # Don't remove scripts directory as we're currently using it
  
  log_success "Existing installation removed."
}

# Reinstall application
reinstall_application() {
  log "Reinstalling application..."
  
  # Navigate to project root
  cd "$(dirname "$0")/.."
  
  # Run installation script
  bash scripts/install.sh
  
  log_success "Application reinstalled successfully."
}

# Main function
main() {
  display_banner
  
  # Ask for confirmation
  read -p "Do you want to proceed with the reinstallation? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Reinstallation cancelled."
    exit 0
  fi
  
  # Double-check confirmation
  read -p "Are you absolutely sure? All local changes will be lost. (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Reinstallation cancelled."
    exit 0
  fi
  
  check_installation
  
  # Ask for backup
  read -p "Do you want to backup the current installation before reinstalling? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    backup_installation
  else
    log_warning "Skipping backup. Proceeding at your own risk."
  fi
  
  remove_installation
  reinstall_application
  
  log_success "Reinstallation completed successfully!"
  echo ""
  echo "To start the backend server, run: cd backend && npm run dev"
  echo "To start the frontend development server, run: cd frontend && npm start"
  echo ""
}

# Run main function
main

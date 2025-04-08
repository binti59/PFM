#!/bin/bash

# Deployment Configuration Script for finance.bikramjitchowdhury.com
# This script configures the server for deployment

echo "Starting deployment configuration for finance.bikramjitchowdhury.com..."

# Create deployment directory if it doesn't exist
DEPLOY_DIR="/var/www/finance.bikramjitchowdhury.com"
mkdir -p $DEPLOY_DIR

# Clone the repository
echo "Cloning repository from GitHub..."
git clone https://github.com/binti59/PFM.git $DEPLOY_DIR/temp

# Move files to deployment directory
echo "Setting up deployment files..."
cp -r $DEPLOY_DIR/temp/* $DEPLOY_DIR/
rm -rf $DEPLOY_DIR/temp

# Install dependencies
echo "Installing dependencies..."
cd $DEPLOY_DIR
cd backend && npm install
cd ../frontend && npm install

# Build frontend
echo "Building frontend..."
cd $DEPLOY_DIR/frontend
npm run build

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/finance.bikramjitchowdhury.com << EOF
server {
    listen 80;
    server_name finance.bikramjitchowdhury.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/finance.bikramjitchowdhury.com /etc/nginx/sites-enabled/

# Configure PM2 for backend
echo "Configuring PM2 for backend service..."
cd $DEPLOY_DIR/backend
pm2 start src/server.js --name "pfm-backend" -- --port 5000

# Configure PM2 for frontend
echo "Configuring PM2 for frontend service..."
cd $DEPLOY_DIR/frontend
pm2 start "PORT=3001 npm start" --name "pfm-frontend"

# Save PM2 configuration
pm2 save

# Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

echo "Deployment configuration completed!"
echo "Application is now running at https://finance.bikramjitchowdhury.com/"

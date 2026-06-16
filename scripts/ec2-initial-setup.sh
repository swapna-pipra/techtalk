#!/bin/bash
# ============================================================
# EC2 INITIAL SETUP SCRIPT
# Run this ONCE after launching your EC2 instance
# Usage: ssh into EC2, then run: bash ec2-initial-setup.sh
# ============================================================

echo "=========================================="
echo "   EC2 Initial Setup for Hackathon App"
echo "=========================================="

# Step 1: Update system
echo ""
echo ">>> Step 1: Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Step 2: Install Node.js 20
echo ""
echo ">>> Step 2: Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Step 3: Install PM2 (keeps your server running forever)
echo ""
echo ">>> Step 3: Installing PM2 process manager..."
sudo npm install -g pm2

# Step 4: Install Nginx (web server for frontend)
echo ""
echo ">>> Step 4: Installing Nginx..."
sudo apt install -y nginx

# Step 5: Install Git
echo ""
echo ">>> Step 5: Installing Git..."
sudo apt install -y git

# Step 6: Clone the repository
echo ""
echo ">>> Step 6: Cloning repository..."
cd ~
git clone https://github.com/YOUR_GITHUB_USERNAME/hackathon.git
cd hackathon

# Step 7: Install and build frontend
echo ""
echo ">>> Step 7: Building frontend..."
npm ci
npm run build

# Step 8: Copy frontend to Nginx directory
echo ""
echo ">>> Step 8: Setting up Nginx to serve frontend..."
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

# Step 9: Configure Nginx
echo ""
echo ">>> Step 9: Configuring Nginx..."
sudo tee /etc/nginx/sites-available/default > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    # Serve React frontend
    root /var/www/html;
    index index.html;

    # Handle React Router (all routes serve index.html)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Express backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Step 10: Restart Nginx
sudo nginx -t && sudo systemctl restart nginx

# Step 11: Start backend with PM2
echo ""
echo ">>> Step 11: Starting backend server..."
cd ~/hackathon/server
npm ci --production
pm2 start index.js --name hackathon-backend
pm2 startup
pm2 save

echo ""
echo "=========================================="
echo "   ✅ SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "Your app is now live at: http://$(curl -s ifconfig.me)"
echo ""
echo "Frontend: http://$(curl -s ifconfig.me) (port 80)"
echo "Backend API: http://$(curl -s ifconfig.me)/api/"
echo ""
echo "PM2 Status:"
pm2 status
echo ""
echo "=========================================="

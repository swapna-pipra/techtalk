#!/bin/bash
# ============================================================
# EC2 Instance Setup Script
# Run this ONCE when you first create your EC2 instance
# ============================================================

echo "=== Updating system ==="
sudo apt update && sudo apt upgrade -y

echo "=== Installing Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "=== Installing PM2 (process manager) ==="
sudo npm install -g pm2

echo "=== Installing Git ==="
sudo apt install -y git

echo "=== Cloning repository ==="
cd ~
git clone https://github.com/YOUR_USERNAME/hackathon.git
cd hackathon/server

echo "=== Installing server dependencies ==="
npm install --production

echo "=== Starting server with PM2 ==="
pm2 start index.js --name hackathon-server
pm2 startup
pm2 save

echo "=== Setup complete! ==="
echo "Server running on port 3001"
echo "PM2 will auto-restart the server if it crashes or on reboot"

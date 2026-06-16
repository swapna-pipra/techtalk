#!/bin/bash
# ============================================================
# AWS Deployment Script (Run from your local machine)
# Prerequisites: AWS CLI configured, .env file filled
# ============================================================

set -e  # Stop on any error

# Load environment variables
source .env

echo "=========================================="
echo "   AWS Deployment - Hackathon App"
echo "=========================================="

# ----------------------------------------------------------
# STEP 1: Verify AWS CLI is working
# ----------------------------------------------------------
echo ""
echo ">>> Step 1: Verifying AWS credentials..."
aws sts get-caller-identity
echo "✅ AWS credentials working!"

# ----------------------------------------------------------
# STEP 2: Create Security Group
# ----------------------------------------------------------
echo ""
echo ">>> Step 2: Creating security group..."

SG_ID=$(aws ec2 create-security-group \
  --group-name hackathon-sg \
  --description "Security group for hackathon app" \
  --query 'GroupId' \
  --output text 2>/dev/null || \
  aws ec2 describe-security-groups \
    --group-names hackathon-sg \
    --query 'SecurityGroups[0].GroupId' \
    --output text)

echo "Security Group ID: $SG_ID"

# Allow SSH (port 22)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp --port 22 --cidr 0.0.0.0/0 2>/dev/null || true

# Allow HTTP (port 80)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp --port 80 --cidr 0.0.0.0/0 2>/dev/null || true

# Allow backend (port 3001)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp --port 3001 --cidr 0.0.0.0/0 2>/dev/null || true

echo "✅ Security group configured!"

# ----------------------------------------------------------
# STEP 3: Create Key Pair
# ----------------------------------------------------------
echo ""
echo ">>> Step 3: Creating key pair..."

aws ec2 create-key-pair \
  --key-name hackathon-key \
  --query 'KeyMaterial' \
  --output text > hackathon-key.pem 2>/dev/null || echo "Key pair already exists"

chmod 400 hackathon-key.pem
echo "✅ Key pair ready!"

# ----------------------------------------------------------
# STEP 4: Launch EC2 Instance
# ----------------------------------------------------------
echo ""
echo ">>> Step 4: Launching EC2 instance..."

# Get latest Ubuntu 22.04 AMI ID for the region
AMI_ID=$(aws ec2 describe-images \
  --owners 099720109477 \
  --filters "Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*" \
  --query 'Images | sort_by(@, &CreationDate) | [-1].ImageId' \
  --output text)

echo "Using AMI: $AMI_ID"

INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type t2.micro \
  --key-name hackathon-key \
  --security-group-ids $SG_ID \
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=hackathon-app}]" \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "Instance ID: $INSTANCE_ID"
echo "Waiting for instance to be running..."

aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Get public IP
EC2_PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "✅ EC2 Instance launched!"
echo "   Public IP: $EC2_PUBLIC_IP"

# ----------------------------------------------------------
# STEP 5: Wait for SSH to be ready
# ----------------------------------------------------------
echo ""
echo ">>> Step 5: Waiting for SSH to be ready (this takes ~60 seconds)..."
sleep 60

# ----------------------------------------------------------
# STEP 6: Setup the server
# ----------------------------------------------------------
echo ""
echo ">>> Step 6: Setting up the server..."

ssh -i hackathon-key.pem -o StrictHostKeyChecking=no ubuntu@$EC2_PUBLIC_IP << 'REMOTE_SCRIPT'
  # Update system
  sudo apt update -y
  sudo apt upgrade -y

  # Install Node.js 20
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs git nginx

  # Install PM2
  sudo npm install -g pm2

  echo "Node: $(node -v)"
  echo "NPM: $(npm -v)"
  echo "✅ Server packages installed!"
REMOTE_SCRIPT

echo "✅ Server setup complete!"

# ----------------------------------------------------------
# STEP 7: Deploy the application
# ----------------------------------------------------------
echo ""
echo ">>> Step 7: Deploying application..."

# Build frontend locally
npm ci
npm run build

# Copy files to EC2
scp -i hackathon-key.pem -o StrictHostKeyChecking=no -r dist ubuntu@$EC2_PUBLIC_IP:~/
scp -i hackathon-key.pem -o StrictHostKeyChecking=no -r server ubuntu@$EC2_PUBLIC_IP:~/
scp -i hackathon-key.pem -o StrictHostKeyChecking=no scripts/nginx.conf ubuntu@$EC2_PUBLIC_IP:~/

# Setup on remote
ssh -i hackathon-key.pem -o StrictHostKeyChecking=no ubuntu@$EC2_PUBLIC_IP << 'REMOTE_SCRIPT'
  # Move frontend files to Nginx directory
  sudo rm -rf /var/www/html/*
  sudo cp -r ~/dist/* /var/www/html/

  # Setup Nginx config
  sudo cp ~/nginx.conf /etc/nginx/sites-available/default
  sudo nginx -t && sudo systemctl restart nginx

  # Start backend
  cd ~/server
  npm install --production
  pm2 start index.js --name hackathon-backend
  pm2 startup
  pm2 save

  echo "✅ Application deployed!"
REMOTE_SCRIPT

# ----------------------------------------------------------
# DONE!
# ----------------------------------------------------------
echo ""
echo "=========================================="
echo "   ✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "   🌐 App URL:  http://$EC2_PUBLIC_IP"
echo "   🔌 API URL:  http://$EC2_PUBLIC_IP/api/holidays"
echo "   🖥️  EC2 IP:   $EC2_PUBLIC_IP"
echo "   🔑 SSH:      ssh -i hackathon-key.pem ubuntu@$EC2_PUBLIC_IP"
echo ""
echo "   Save this IP in your .env file as EC2_HOST=$EC2_PUBLIC_IP"
echo "=========================================="

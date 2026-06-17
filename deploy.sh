#!/bin/bash
# ============================================================
# LOCAL DEPLOY SCRIPT
# Builds, pushes to GitHub, and deploys to EC2 — all in one command
# 
# Usage:
#   bash deploy.sh                    → deploys with auto message
#   bash deploy.sh "my changes"       → deploys with custom commit message
# ============================================================

set -e

# Configuration
EC2_HOST="13.201.42.158"
EC2_USER="ubuntu"
EC2_KEY="$HOME/Downloads/democ.pem"
COMMIT_MSG="${1:-Deploy: $(date '+%Y-%m-%d %H:%M')}"

echo ""
echo "🚀 ============================================"
echo "   BUILD → PUSH → DEPLOY (All in One)"
echo "   ============================================"

# Step 1: Build frontend
echo ""
echo "📦 [1/5] Building frontend..."
npm run build
echo "   ✅ Built → dist/ folder ready"

# Step 2: Stage all changes
echo ""
echo "📋 [2/5] Staging changes..."
git add -A
echo "   ✅ All files staged"

# Step 3: Commit
echo ""
echo "💾 [3/5] Committing: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG" 2>/dev/null || echo "   (Nothing new to commit)"

# Step 4: Push to GitHub (this also triggers GitHub Actions CI/CD)
echo ""
echo "📤 [4/5] Pushing to GitHub..."
git push origin main
echo "   ✅ Pushed to GitHub (CI/CD also triggered)"

# Step 5: Direct deploy to EC2 (faster than waiting for GitHub Actions)
echo ""
echo "🖥️  [5/5] Deploying directly to EC2..."

# Deploy frontend
scp -o StrictHostKeyChecking=no -i "$EC2_KEY" -r dist/* "$EC2_USER@$EC2_HOST:/tmp/hackathon-deploy/" 2>/dev/null
ssh -o StrictHostKeyChecking=no -i "$EC2_KEY" "$EC2_USER@$EC2_HOST" << 'REMOTE'
  sudo rm -rf /var/www/html/*
  sudo cp -r /tmp/hackathon-deploy/* /var/www/html/
  rm -rf /tmp/hackathon-deploy
REMOTE

# Deploy backend
scp -o StrictHostKeyChecking=no -i "$EC2_KEY" server/index.js server/database.js server/package.json "$EC2_USER@$EC2_HOST:~/hackathon/server/" 2>/dev/null
ssh -o StrictHostKeyChecking=no -i "$EC2_KEY" "$EC2_USER@$EC2_HOST" "cd ~/hackathon/server && pm2 restart hackathon-backend" 2>/dev/null

echo "   ✅ EC2 deployed"

# Verify
echo ""
echo "🔍 Verifying..."
sleep 2
F=$(curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST/)
A=$(curl -s -o /dev/null -w "%{http_code}" http://$EC2_HOST/api/holidays)

echo ""
echo "   ============================================"
echo "   Frontend:  HTTP $F"
echo "   Backend:   HTTP $A"
echo "   ============================================"
echo ""

if [ "$F" = "200" ] && [ "$A" = "200" ]; then
    echo "   ✅ ALL GOOD! Live at: http://$EC2_HOST"
else
    echo "   ⚠️  Check: ssh -i $EC2_KEY $EC2_USER@$EC2_HOST 'pm2 logs --lines 10 --nostream'"
fi
echo ""

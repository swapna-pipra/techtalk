# Pi ERP Hackathon — Complete CI/CD Documentation

## Project Overview

This is a full-stack web application with:
- **Frontend**: React (Vite) — runs on port 5173 locally, served by Nginx on EC2
- **Backend**: Express.js — runs on port 3001
- **Database**: SQLite (file-based, lives with the server)
- **Hosting**: AWS EC2 instance (Ubuntu 22.04)
- **CI/CD**: GitHub Actions (auto-deploy on push to main)

---

## Live URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend (React App) | http://13.233.173.78 | Users access the app here |
| Backend API | http://13.233.173.78/api/holidays | API endpoints |
| GitHub Repo | https://github.com/swapna-pipra/techtalk | Source code |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    EC2 Instance (13.233.173.78)               │
│                                                              │
│  ┌──────────────┐         ┌────────────────────────────┐    │
│  │    Nginx     │───/───▶ │  React App (dist/ files)   │    │
│  │  (Port 80)   │         │  Location: /var/www/html/  │    │
│  │              │         └────────────────────────────┘    │
│  │              │                                            │
│  │              │──/api/─▶ ┌────────────────────────────┐   │
│  │              │          │  Express.js Backend         │   │
│  └──────────────┘          │  (Port 3001, managed by PM2)│   │
│                            │  + SQLite Database           │   │
│                            └────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
            ▲
            │ HTTP requests (port 80)
            │
    Users access via browser
```

---

## CI/CD Pipeline Flow

```
Developer pushes code → GitHub (main branch)
        │
        ▼
GitHub Actions workflow triggers automatically
        │
        ▼
GitHub runner SSHs into EC2 instance
        │
        ▼
Pulls latest code → Builds frontend → Copies to Nginx → Restarts backend
        │
        ▼
App is live with new changes (takes ~90 seconds)
```

---

## PART 1: Running the Project Locally

### Purpose
Run the app on your own machine for development and testing before pushing to production.

### Terminal 1 — Start Backend Server

```bash
cd /home/user/Documents/Pi_Erp_project/hackathon/server
node index.js
```

**Purpose**: Starts the Express.js API server on port 3001. Handles login, registration, attendance, leave, holidays APIs.

**Expected Output**:
```
Backend server running on http://localhost:3001
```

### Terminal 2 — Start Frontend Dev Server

```bash
cd /home/user/Documents/Pi_Erp_project/hackathon
npm run dev
```

**Purpose**: Starts the Vite development server with hot-reload on port 5173. Any code change you make will instantly reflect in the browser.

**Expected Output**:
```
  VITE v8.0.16  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Access Locally

Open browser → http://localhost:5173

---

## PART 2: AWS EC2 Instance Commands

### Check EC2 Instance Status from Local CLI

```bash
aws ec2 describe-instances --region ap-south-1 --query 'Reservations[*].Instances[*].[Tags[?Key==`Name`].Value|[0],State.Name,PublicIpAddress,InstanceId]' --output table
```

**Purpose**: Lists all your EC2 instances with their name, running status, public IP, and instance ID. Use this to verify your instance is running.

**Expected Output**:
```
---------------------------------------------------------------------------
|                            DescribeInstances                             |
+--------------------+----------+-----------------+-----------------------+
|  Swapna Tech Talk  |  running |  13.233.173.78  |  i-0a6d1ed02993c29b8  |
+--------------------+----------+-----------------+-----------------------+
```

### Check if App is Responding (Without SSH)

```bash
curl -s -o /dev/null -w "Frontend HTTP Status: %{http_code}\n" http://13.233.173.78/
```

**Purpose**: Sends a request to the frontend and shows the HTTP status code (200 = working).

```bash
curl -s http://13.233.173.78/api/holidays
```

**Purpose**: Tests if the backend API is responding. Should return JSON data of holidays.

### Check Both Frontend and Backend in One Command

```bash
curl -s -o /dev/null -w "Frontend: %{http_code}\n" http://13.233.173.78/ && curl -s -o /dev/null -w "Backend API: %{http_code}\n" http://13.233.173.78/api/holidays
```

**Purpose**: Quick health check of both services. Both should show `200`.

---

## PART 3: SSH into EC2 Instance

### Connect to EC2

```bash
ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78
```

**Purpose**: Opens a secure shell connection to your EC2 instance. The `democ.pem` is the private key that authenticates you.

### Check Backend Status (PM2)

```bash
pm2 status
```

**Purpose**: Shows if the Express backend process is running, its uptime, memory usage, and restart count.

**Expected Output**:
```
│ 0  │ hackathon-backend │ online │ 1.0.0 │ fork │ 15307 │ 2h │ 0 │ 62.5mb │
```

### View Backend Logs

```bash
pm2 logs hackathon-backend
```

**Purpose**: Shows real-time logs from the Express server. Useful for debugging API errors. Press `Ctrl+C` to exit.

```bash
pm2 logs hackathon-backend --lines 20 --nostream
```

**Purpose**: Shows last 20 lines of logs without streaming (exits immediately).

### Restart Backend

```bash
pm2 restart hackathon-backend
```

**Purpose**: Restarts the Express server. Use after pulling new code or fixing issues.

### Stop Backend

```bash
pm2 stop hackathon-backend
```

**Purpose**: Stops the backend server. The app's API will stop responding.

### Start Backend (if stopped)

```bash
cd ~/hackathon/server
pm2 start index.js --name hackathon-backend
```

**Purpose**: Starts the backend if it was stopped or deleted from PM2.

### Check Nginx Status (Frontend Server)

```bash
sudo systemctl status nginx
```

**Purpose**: Shows if Nginx (which serves the React frontend) is running.

**Expected Output**:
```
● nginx.service - A high performance web server
     Active: active (running) since ...
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

**Purpose**: Restarts the Nginx web server. Use after changing Nginx configuration.

### View Nginx Error Logs

```bash
sudo tail -f /var/log/nginx/error.log
```

**Purpose**: Shows Nginx error logs in real-time. Useful for debugging 502/504 errors. Press `Ctrl+C` to exit.

### View Nginx Access Logs

```bash
sudo tail -f /var/log/nginx/access.log
```

**Purpose**: Shows every request hitting your server in real-time. Useful to confirm users are accessing the app.

---

## PART 4: Manual Deployment on EC2 (Without CI/CD)

### SSH into EC2 first

```bash
ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78
```

### Pull Latest Code from GitHub

```bash
cd ~/hackathon
git pull origin main
```

**Purpose**: Downloads the latest code changes from GitHub to the EC2 server.

### Rebuild Frontend

```bash
npm ci
npm run build
```

**Purpose**: `npm ci` installs exact dependencies from package-lock.json. `npm run build` creates optimized production files in the `dist/` folder.

### Copy Built Frontend to Nginx

```bash
sudo cp -r dist/* /var/www/html/
```

**Purpose**: Copies the built React files to Nginx's serving directory so users see the updated app.

### Update Backend Dependencies

```bash
cd ~/hackathon/server
npm ci --production
```

**Purpose**: Installs backend dependencies (only production ones, no dev tools).

### Restart Backend

```bash
pm2 restart hackathon-backend
```

**Purpose**: Restarts Express so it picks up any code changes.

### Complete Manual Deploy (All in One)

```bash
cd ~/hackathon
git pull origin main
npm ci && npm run build
sudo cp -r dist/* /var/www/html/
cd server && npm ci --production
pm2 restart hackathon-backend
sudo systemctl restart nginx
```

**Purpose**: Full manual deployment in sequence. This is exactly what the CI/CD pipeline automates.

---

## PART 5: CI/CD Pipeline (Automatic Deployment)

### How It Works

Every time you push code to the `main` branch on GitHub, GitHub Actions automatically:
1. SSHs into your EC2 instance
2. Pulls the latest code
3. Builds the frontend
4. Copies it to Nginx's directory
5. Restarts the backend

### Push Code to Trigger CI/CD

```bash
cd /home/user/Documents/Pi_Erp_project/hackathon
git add .
git commit -m "your change description"
git push origin main
```

**Purpose**: Pushes your code to GitHub, which triggers the CI/CD pipeline automatically.

### Check Pipeline Status

Go to: https://github.com/swapna-pipra/techtalk/actions

**Purpose**: Shows if the deployment succeeded (green ✅) or failed (red ❌).

### GitHub Secrets Required for CI/CD

Go to: GitHub Repo → Settings → Secrets and variables → Actions → New repository secret

| Secret Name | Value | Purpose |
|-------------|-------|---------|
| `EC2_HOST` | `13.233.173.78` | Tells GitHub Actions which server to deploy to |
| `EC2_SSH_KEY` | Contents of `democ.pem` file | Authenticates GitHub Actions to SSH into EC2 |

### How to Get .pem Contents for GitHub Secret

```bash
cat ~/Downloads/democ.pem
```

**Purpose**: Displays the entire private key. Copy ALL of it (including the BEGIN/END lines) and paste into the GitHub Secret value field.

---

## PART 6: Git Commands

### Check Git Status

```bash
cd /home/user/Documents/Pi_Erp_project/hackathon
git status
```

**Purpose**: Shows which files have been modified, added, or are untracked.

### Stage All Changes

```bash
git add .
```

**Purpose**: Stages all modified and new files for the next commit.

### Commit Changes

```bash
git commit -m "description of what you changed"
```

**Purpose**: Saves a snapshot of your staged changes with a message.

### Push to GitHub

```bash
git push origin main
```

**Purpose**: Uploads your commits to the remote GitHub repository. If CI/CD is configured, this triggers auto-deployment.

### Pull Latest from GitHub

```bash
git pull origin main
```

**Purpose**: Downloads latest changes from GitHub to your local machine.

### Check Remote URL

```bash
git remote -v
```

**Purpose**: Shows which GitHub repository your local project is connected to.

**Expected Output**:
```
origin  https://github.com/swapna-pipra/techtalk.git (fetch)
origin  https://github.com/swapna-pipra/techtalk.git (push)
```

---

## PART 7: AWS CLI Commands

### Check Who You're Logged in As

```bash
aws sts get-caller-identity
```

**Purpose**: Shows your AWS account ID, IAM username, and ARN. Confirms your AWS CLI is properly configured.

**Expected Output**:
```json
{
    "UserId": "AIDASRND23VUE4C23JWA5",
    "Account": "174826642792",
    "Arn": "arn:aws:iam::174826642792:user/swapna@pipra.solutions"
}
```

### List All EC2 Instances

```bash
aws ec2 describe-instances --region ap-south-1 --query 'Reservations[*].Instances[*].[Tags[?Key==`Name`].Value|[0],State.Name,PublicIpAddress,InstanceType]' --output table
```

**Purpose**: Shows all EC2 instances in your account with their names, status, IPs, and types.

### Start an EC2 Instance

```bash
aws ec2 start-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```

**Purpose**: Starts the "Swapna Tech Talk" EC2 instance if it was stopped.

### Stop an EC2 Instance

```bash
aws ec2 stop-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```

**Purpose**: Stops the EC2 instance (saves cost when not in use). Your app will go offline.

### Check Security Groups (Firewall Rules)

```bash
aws ec2 describe-security-groups --region ap-south-1 --query 'SecurityGroups[*].[GroupName,GroupId]' --output table
```

**Purpose**: Lists all security groups. Security groups control which ports are open (22 for SSH, 80 for HTTP, 3001 for API).

---

## PART 8: Files Created and Their Purpose

### Project Structure

```
hackathon/
├── .github/
│   └── workflows/
│       └── deploy.yml              ← CI/CD pipeline definition
├── scripts/
│   ├── ec2-initial-setup.sh        ← One-time EC2 setup script
│   ├── ec2-setup.sh                ← Alternative setup script
│   └── nginx.conf                  ← Nginx configuration file
├── server/
│   ├── index.js                    ← Express backend (API routes)
│   ├── database.js                 ← SQLite database setup
│   ├── database.sqlite             ← SQLite database file
│   └── package.json                ← Backend dependencies
├── src/                            ← React frontend source code
│   ├── App.jsx                     ← Main React component
│   ├── components/                 ← Reusable UI components
│   ├── contexts/                   ← React context (auth)
│   └── pages/                      ← Page components (ESS, MSS)
├── dist/                           ← Built frontend (generated)
├── .env                            ← AWS credentials (NEVER commit)
├── .gitignore                      ← Files to exclude from Git
├── package.json                    ← Frontend dependencies
├── vite.config.js                  ← Vite build configuration
├── CICD-GUIDE.md                   ← CI/CD guide
└── COMPLETE-DOCUMENTATION.md       ← THIS FILE
```

### File-by-File Explanation

| File | Purpose | When It's Used |
|------|---------|---------------|
| `.github/workflows/deploy.yml` | Defines the CI/CD pipeline steps | Automatically read by GitHub on every push to main |
| `scripts/ec2-initial-setup.sh` | Installs Node.js, Nginx, PM2, clones repo on EC2 | Run once when setting up a new EC2 instance |
| `scripts/nginx.conf` | Configures Nginx to serve React + proxy API | Copied to `/etc/nginx/sites-available/default` on EC2 |
| `server/index.js` | Express.js API server with all routes | Runs on EC2 via PM2 on port 3001 |
| `server/database.js` | Creates SQLite tables and seed data | Called when server starts |
| `server/database.sqlite` | The actual database file | Stores users, attendance, leaves, holidays |
| `src/App.jsx` | Main React app with routing | Entry point for the frontend |
| `vite.config.js` | Vite bundler configuration | Used during `npm run build` |
| `.env` | AWS credentials (access key, secret key) | Used by AWS CLI locally. NEVER push to Git |
| `.gitignore` | Lists files Git should ignore | Prevents .env, node_modules, dist from being committed |

---

## PART 9: Nginx Configuration Explained

File location on EC2: `/etc/nginx/sites-available/default`

```nginx
server {
    listen 80;                          # Listen on port 80 (HTTP)
    server_name _;                      # Accept any domain/IP

    root /var/www/html;                 # Where React build files live
    index index.html;                   # Default file to serve

    # Serve React frontend
    location / {
        try_files $uri $uri/ /index.html;   # If file not found, serve index.html
    }                                       # This makes React Router work

    # Proxy API requests to Express backend
    location /api/ {
        proxy_pass http://localhost:3001;    # Forward /api/* to Express
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Why this matters**:
- Without `try_files ... /index.html`, refreshing on `/dashboard` would show 404
- Without the `/api/` proxy, frontend would need to know the backend port directly

---

## PART 10: GitHub Actions Workflow Explained

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to EC2
on:
  push:
    branches: [main]          # Trigger: any push to main branch
```

**Purpose**: Tells GitHub to run this workflow whenever code is pushed to main.

```yaml
steps:
  - name: Deploy to EC2
    uses: appleboy/ssh-action@v1
    with:
      host: ${{ secrets.EC2_HOST }}       # EC2 IP from GitHub Secrets
      username: ubuntu                     # Default Ubuntu user
      key: ${{ secrets.EC2_SSH_KEY }}      # .pem file from GitHub Secrets
      script: |
        cd ~/hackathon
        git pull origin main              # Get latest code
        npm ci && npm run build           # Build frontend
        sudo cp -r dist/* /var/www/html/  # Deploy frontend
        cd server && npm ci --production  # Install backend deps
        pm2 restart hackathon-backend     # Restart backend
```

**Purpose**: SSHs into EC2 and runs deployment commands automatically.

---

## PART 11: PM2 Process Manager Explained

### What is PM2?
PM2 keeps your Node.js server running 24/7. If the server crashes, PM2 automatically restarts it. If EC2 reboots, PM2 starts the server again.

### Key PM2 Commands

| Command | Purpose |
|---------|---------|
| `pm2 status` | Show all managed processes |
| `pm2 logs hackathon-backend` | View live logs |
| `pm2 restart hackathon-backend` | Restart the server |
| `pm2 stop hackathon-backend` | Stop the server |
| `pm2 start index.js --name hackathon-backend` | Start with a name |
| `pm2 save` | Save current processes for auto-restart on reboot |
| `pm2 startup` | Configure PM2 to start on system boot |

---

## PART 12: Troubleshooting

| Problem | Command to Debug | Solution |
|---------|-----------------|----------|
| Frontend not loading | `curl http://13.233.173.78/` | Check Nginx: `sudo systemctl status nginx` |
| API returning 502 | `pm2 logs hackathon-backend` | Restart: `pm2 restart hackathon-backend` |
| Can't SSH into EC2 | `ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78` | Check security group allows port 22 |
| Changes not showing | Hard refresh browser `Ctrl+Shift+R` | Or redeploy: `sudo cp -r dist/* /var/www/html/` |
| EC2 instance stopped | `aws ec2 start-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1` | Wait 1 min then check IP |
| GitHub Actions failing | Check https://github.com/swapna-pipra/techtalk/actions | Verify secrets are set correctly |
| Database empty | SSH in, check `ls ~/hackathon/server/database.sqlite` | Restart backend: `pm2 restart hackathon-backend` |

---

## PART 13: Live Demo Script (How to Present)

### Step 1: Show the Live App (30 seconds)
> "Here's our Pi ERP application running live on AWS EC2."
> Open http://13.233.173.78 in browser
> Show Login, Dashboard, Leave Management pages

### Step 2: Explain Architecture (1 minute)
> "We have a single EC2 instance running:
> - Nginx on port 80 serves our React frontend
> - Express.js on port 3001 handles API requests
> - PM2 keeps the backend alive and auto-restarts on failures
> - Nginx acts as a reverse proxy — all /api/ requests go to Express"

### Step 3: Show CI/CD Pipeline (1 minute)
> "Let me show you our CI/CD pipeline..."
> Open `.github/workflows/deploy.yml`
> "When we push to the main branch, GitHub Actions automatically SSHs into our EC2 and deploys the latest code. No manual SSH, no manual uploads."

### Step 4: Live Deployment Demo (2 minutes)
> "Let me make a change right now..."

```bash
# Make a visible change (e.g., change a title or color)
git add .
git commit -m "live demo: updated title"
git push origin main
```

> "Now watch GitHub Actions..."
> Open: https://github.com/swapna-pipra/techtalk/actions
> Wait for green checkmark
> Refresh the browser
> "And there it is — change is live. Zero manual steps."

### Step 5: Show Monitoring (30 seconds)
```bash
ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78
pm2 status
pm2 logs hackathon-backend --lines 5 --nostream
```
> "We can monitor the server status and logs from CLI at any time."

---

## PART 14: Security Notes

| Item | Status | Action |
|------|--------|--------|
| `.env` file | In `.gitignore` | ✅ Credentials never pushed to GitHub |
| AWS credentials | In `.env` locally | Rotate if exposed |
| GitHub PAT | Was exposed in chat | ⚠️ Revoke and create new one |
| SSH Key (democ.pem) | Stored in ~/Downloads | Keep secure, never share |
| EC2 Security Group | Ports 22, 80, 3001 open | Restrict SSH to your IP only |

---

## PART 15: Cost

| Resource | Monthly Cost |
|----------|-------------|
| EC2 t3.medium (Swapna Tech Talk) | ~$30/month (or free tier if t2.micro) |
| Data Transfer (first 100GB) | Free |
| Storage (8GB EBS) | ~$0.80/month |

**Tip**: Stop the instance when not in use to save cost:
```bash
aws ec2 stop-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```

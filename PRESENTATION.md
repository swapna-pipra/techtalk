# Pi ERP — CI/CD Pipeline Presentation

---

## SLIDE 1: Title

### Pi ERP — CI/CD Pipeline on AWS
**Deploying a Full-Stack Application with GitHub Actions & EC2**

- Presenter: Swapna Karumoju
- Date: June 2026
- Tech Stack: React | Express.js | SQLite | Nginx | AWS EC2 | GitHub Actions

---

## SLIDE 2: What is This Project?

### Pi ERP — Employee Self Service Portal

A full-stack HR management application featuring:

| Module | Features |
|--------|----------|
| ESS (Employee) | Profile, Attendance, Leave, Holidays, Goals, Documents, Org Chart |
| MSS (Manager) | Leave Approvals, Performance Reviews, Probation, Team Analytics |
| Auth | Login, Register, Role-based access |

**Frontend**: React (Vite)
**Backend**: Express.js + SQLite
**Live at**: http://13.233.173.78

---

## SLIDE 3: What is CI/CD?

### CI = Continuous Integration
> Automatically build and test code every time a developer pushes changes

### CD = Continuous Deployment
> Automatically deploy tested code to production servers

### Why CI/CD?
- ❌ No more manual file uploads via FTP
- ❌ No more SSH-ing to restart servers
- ❌ No more "it works on my machine"
- ✅ Push code → Auto deploy → Live in 90 seconds

---

## SLIDE 4: Architecture Overview

```
┌──────────────────────────────────────────────────┐
│              EC2 Instance (AWS)                    │
│                                                   │
│   ┌─────────┐        ┌────────────────────┐     │
│   │  Nginx  │──/──▶  │  React Frontend    │     │
│   │ Port 80 │        │  /var/www/html/    │     │
│   │         │        └────────────────────┘     │
│   │         │                                    │
│   │         │─/api/─▶ ┌────────────────────┐    │
│   │         │         │  Express Backend    │    │
│   └─────────┘         │  Port 3001 (PM2)   │    │
│                       │  + SQLite DB        │    │
│                       └────────────────────┘    │
└──────────────────────────────────────────────────┘
         ▲
         │ Users access via browser
         │ http://13.233.173.78
```

---

## SLIDE 5: Tech Stack Explained

| Technology | Role | Why We Chose It |
|------------|------|-----------------|
| **React** | Frontend UI | Component-based, fast, widely adopted |
| **Vite** | Build tool | Instant hot reload, fast builds |
| **Express.js** | Backend API | Lightweight, easy to deploy |
| **SQLite** | Database | No setup needed, file-based |
| **Nginx** | Web server | Serves static files + reverse proxy |
| **PM2** | Process manager | Keeps backend running 24/7 |
| **AWS EC2** | Cloud hosting | Full control, scalable |
| **GitHub Actions** | CI/CD | Free, integrates with GitHub |

---

## SLIDE 6: CI/CD Pipeline Flow

```
Step 1: Developer pushes code to GitHub (main branch)
           │
           ▼
Step 2: GitHub Actions triggers automatically
           │
           ▼
Step 3: Runner SSHs into EC2 instance
           │
           ▼
Step 4: git pull → npm build → copy to Nginx → restart PM2
           │
           ▼
Step 5: App is live! (~90 seconds total)
```

---

## SLIDE 7: The Pipeline File

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to EC2
on:
  push:
    branches: [main]    # Trigger on push to main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_HOST }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/hackathon
            git pull origin main
            npm ci && npm run build
            sudo cp -r dist/* /var/www/html/
            cd server && npm ci --production
            pm2 restart hackathon-backend
```

---

## SLIDE 8: AWS Services Used

| Service | What It Does | Our Use |
|---------|-------------|---------|
| **EC2** | Virtual machine in the cloud | Runs our app 24/7 |
| **IAM** | Identity & access management | Controls who can access AWS |
| **Security Groups** | Firewall rules | Opens ports 22, 80, 3001 |
| **Key Pairs** | SSH authentication | Secure access to EC2 |

**Instance Details**:
- Name: Swapna Tech Talk
- Type: t3.medium
- OS: Ubuntu 22.04 LTS
- IP: 13.233.173.78
- Region: ap-south-1 (Mumbai)

---

## SLIDE 9: Nginx as Reverse Proxy

### What Nginx Does for Us:

```
User requests http://13.233.173.78/dashboard
  → Nginx serves React's index.html (SPA routing)

User requests http://13.233.173.78/api/holidays
  → Nginx forwards to Express on port 3001
  → Express returns JSON data
```

### Why Not Just Use Express for Everything?
- Nginx is faster at serving static files
- Handles multiple concurrent connections better
- Provides security layer between internet and backend
- Standard production setup

---

## SLIDE 10: PM2 Process Manager

### What PM2 Does:

| Feature | Benefit |
|---------|---------|
| Auto-restart on crash | App never stays down |
| Auto-start on reboot | Survives EC2 restarts |
| Log management | Easy debugging |
| Process monitoring | CPU/memory tracking |

### Key Commands:
```bash
pm2 status                    # Check if running
pm2 logs hackathon-backend    # View logs
pm2 restart hackathon-backend # Restart
pm2 save                      # Save for auto-start
```

---

## SLIDE 11: Security Measures

| Measure | Implementation |
|---------|---------------|
| Credentials in GitHub Secrets | Never exposed in code |
| `.env` in `.gitignore` | AWS keys never committed |
| SSH Key Authentication | No password-based SSH |
| Security Groups | Only required ports open |
| Nginx reverse proxy | Backend not directly exposed |

### GitHub Secrets Used:
- `EC2_HOST` → Server IP address
- `EC2_SSH_KEY` → SSH private key for deployment

---

## SLIDE 12: Deployment Steps (What We Did)

### One-Time Setup:
1. ✅ Created EC2 instance (Ubuntu 22.04)
2. ✅ Installed Node.js, Nginx, PM2, Git
3. ✅ Cloned repo from GitHub
4. ✅ Built frontend, configured Nginx
5. ✅ Started backend with PM2
6. ✅ Configured GitHub Secrets

### Every Subsequent Deploy (Automated):
1. Push code to `main`
2. GitHub Actions runs pipeline
3. App updates automatically

---

## SLIDE 13: Live Demo

### Step 1: Show the app running
> Open http://13.233.173.78

### Step 2: Make a code change
```bash
git add .
git commit -m "demo change"
git push origin main
```

### Step 3: Watch GitHub Actions
> Open GitHub → Actions tab → Pipeline running

### Step 4: Refresh browser
> Change is live!

### Step 5: Check server
```bash
ssh -i democ.pem ubuntu@13.233.173.78
pm2 status
```

---

## SLIDE 14: Project Files Overview

```
hackathon/
├── .github/workflows/deploy.yml   ← CI/CD Pipeline
├── scripts/
│   ├── ec2-initial-setup.sh       ← EC2 Setup Script
│   └── nginx.conf                 ← Web Server Config
├── server/
│   ├── index.js                   ← Backend API
│   ├── database.js                ← DB Setup
│   └── database.sqlite            ← Database File
├── src/                           ← React Frontend
│   ├── pages/ess/                 ← Employee Pages
│   └── pages/mss/                 ← Manager Pages
├── dist/                          ← Built Frontend
└── package.json                   ← Dependencies
```

---

## SLIDE 15: Benefits of This Approach

| Before CI/CD | After CI/CD |
|-------------|-------------|
| Manual file upload | Automatic on push |
| SSH to restart server | Auto restart via PM2 |
| "Did you deploy?" confusion | GitHub Actions shows status |
| Deploy takes 15+ minutes | Deploy takes 90 seconds |
| Human errors during deploy | Consistent automated process |
| Only one person can deploy | Anyone can push to main |

---

## SLIDE 16: Future Improvements

| Improvement | Benefit |
|-------------|---------|
| Add HTTPS (SSL certificate) | Secure data in transit |
| Use RDS instead of SQLite | Better for production |
| Add Docker containers | Consistent environments |
| Add automated testing | Catch bugs before deploy |
| Use Load Balancer | Handle more users |
| Add CloudFront CDN | Faster global access |
| Blue-Green deployment | Zero-downtime updates |

---

## SLIDE 17: Key Takeaways

1. **CI/CD eliminates manual deployment** — push to main, it's live
2. **Nginx + PM2** is the standard Node.js production setup
3. **GitHub Actions** is free and easy to configure
4. **AWS EC2** gives full control over your server
5. **Security** — secrets in GitHub Secrets, never in code
6. **Monitoring** — PM2 logs and status for debugging

---

## SLIDE 18: Q&A

### Common Questions:

**Q: How much does this cost?**
A: EC2 t2.micro is free tier eligible for 12 months. Our t3.medium costs ~$30/month.

**Q: What happens if the server crashes?**
A: PM2 auto-restarts the backend. Nginx auto-starts on reboot.

**Q: Can multiple people deploy?**
A: Yes! Anyone with push access to `main` triggers deployment.

**Q: How do we rollback a bad deploy?**
A: `git revert` the commit and push — CI/CD deploys the fix.

---

## SLIDE 19: Thank You

### Links:
- **Live App**: http://13.233.173.78
- **GitHub Repo**: https://github.com/swapna-pipra/techtalk
- **Pipeline**: https://github.com/swapna-pipra/techtalk/actions

### Contact:
- Swapna Karumoju
- swapna@pipra.solutions

---

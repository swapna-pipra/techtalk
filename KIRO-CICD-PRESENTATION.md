# CI/CD with Kiro — Presentation + Live Demo Plan

---

## SLIDE 1: Title

### CI/CD Pipeline — The Problem & How Kiro Solves It
**From "Works on My Machine" to Production in 90 Seconds**

- Project: Pi ERP (Employee Self Service Portal)
- Stack: React + Express.js + AWS EC2 + GitHub Actions
- Tool: Kiro (AI-Powered IDE)

---

## SLIDE 2: The Problem — Traditional CI/CD Setup

### What developers usually go through:

| Step | Pain Point | Time Spent |
|------|-----------|------------|
| 1. Research | "How do I deploy React to EC2?" | 2-4 hours |
| 2. Server Setup | Install Node, Nginx, PM2 manually | 1-2 hours |
| 3. Nginx Config | Reverse proxy, SPA routing issues | 1-2 hours |
| 4. Write Pipeline | YAML syntax errors, trial & error | 2-3 hours |
| 5. GitHub Secrets | Figure out what's needed, format issues | 30 min |
| 6. Debugging | Pipeline fails 5-10 times before working | 2-4 hours |
| **Total** | | **9-15 hours** |

### Common Failures:
- ❌ Wrong Nginx config → 502 Bad Gateway
- ❌ PM2 not persisting → Backend dies after reboot
- ❌ SSH key format wrong in GitHub Secrets
- ❌ Forgetting to open ports in Security Groups
- ❌ SPA routing broken → 404 on page refresh
- ❌ CORS errors between frontend and backend

---

## SLIDE 3: How Kiro Helps — The AI Difference

### What Kiro did for us:

| What I Asked Kiro | What Kiro Generated |
|-------------------|-------------------|
| "Set up CI/CD for this project on EC2" | Complete `deploy.yml` pipeline file |
| "Configure Nginx for React + Express" | Full `nginx.conf` with reverse proxy |
| "Create EC2 setup script" | `ec2-initial-setup.sh` with all dependencies |
| "How do I handle SPA routing?" | Nginx `try_files` rule added automatically |
| "Make backend survive server restart" | PM2 startup + save commands |

### Time Spent with Kiro: ~30 minutes (vs 9-15 hours manually)

---

## SLIDE 4: Kiro's Approach — Spec-Driven Development

### How Kiro thinks about CI/CD:

```
┌─────────────────────────────────────────────┐
│  1. UNDERSTAND the project                   │
│     → React frontend + Express backend       │
│     → What ports? What build commands?       │
├─────────────────────────────────────────────┤
│  2. DESIGN the infrastructure                │
│     → Nginx as reverse proxy                 │
│     → PM2 for process management             │
│     → GitHub Actions for automation          │
├─────────────────────────────────────────────┤
│  3. GENERATE all config files                │
│     → deploy.yml (pipeline)                  │
│     → nginx.conf (web server)                │
│     → setup scripts (one-time infra)         │
├─────────────────────────────────────────────┤
│  4. VALIDATE and explain                     │
│     → Each file has comments                 │
│     → Error handling built in                │
│     → Troubleshooting guide generated        │
└─────────────────────────────────────────────┘
```

---

## SLIDE 5: What Kiro Generated — The Files

### 1. Pipeline (`deploy.yml`) — Auto-deploy on push

```yaml
name: Deploy to EC2
on:
  push:
    branches: [main]    # ← Kiro knew to trigger on main

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

### 2. Nginx Config — Handles SPA + API routing

```nginx
location / {
    try_files $uri $uri/ /index.html;  # ← SPA routing fix
}
location /api/ {
    proxy_pass http://localhost:3001;   # ← Reverse proxy to Express
}
```

### 3. Setup Script — One command to configure EC2

```bash
# Installs: Node 20, Nginx, PM2, Git
# Configures: Nginx, PM2 startup, firewall
# Builds: Frontend, starts backend
```

---

## SLIDE 6: Before vs After Kiro

| Aspect | Without Kiro | With Kiro |
|--------|-------------|-----------|
| **Time to set up** | 9-15 hours | 30 minutes |
| **Pipeline failures** | 5-10 before working | 0-1 (works first try) |
| **Config errors** | Manual debugging | Pre-validated configs |
| **Documentation** | Write separately | Auto-generated |
| **Knowledge needed** | DevOps expertise | Describe what you want |
| **Troubleshooting** | Stack Overflow searching | Built-in error handling |
| **Consistency** | Different every time | Reproducible setup |

---

## SLIDE 7: Kiro Features That Helped

### 1. Context Awareness
> Kiro read our `package.json`, `vite.config.js`, and `server/index.js` 
> to understand the project structure automatically

### 2. Multi-File Generation
> Generated pipeline, nginx config, and setup scripts in one flow
> All files are consistent with each other

### 3. Best Practices Built-In
> - Security: Secrets in GitHub, not in code
> - Reliability: PM2 with auto-restart
> - Performance: Nginx for static files
> - Error handling: `||` fallbacks in scripts

### 4. Iterative Refinement
> "Add health check" → Kiro updates deploy.yml
> "Support multiple environments" → Kiro adds staging branch trigger
> "Add rollback" → Kiro suggests git revert strategy

---

## SLIDE 8: Live Demo Plan

### What We'll Show (5 minutes):

---

### DEMO STEP 1: Show the Running App (30 sec)
> Open browser → http://13.233.173.78
> "This is our Pi ERP app, running on AWS EC2, deployed via CI/CD"

---

### DEMO STEP 2: Make a Code Change in Kiro (1 min)
> In Kiro IDE, open a component (e.g., Dashboard.jsx)
> Make a visible change (change a heading, color, or add text)
> Show how Kiro helps with the code change

---

### DEMO STEP 3: Commit & Push (30 sec)
```bash
git add .
git commit -m "live demo: updated dashboard heading"
git push origin main
```

---

### DEMO STEP 4: Watch GitHub Actions (1-2 min)
> Open GitHub → Actions tab
> Show pipeline running in real-time
> Point out each step: Checkout → Build → SSH → Deploy

---

### DEMO STEP 5: See the Change Live (30 sec)
> Refresh browser → Change is live!
> "Push to main → Live in 90 seconds. Zero manual work."

---

### DEMO STEP 6: Show Kiro Generating a Fix (Optional, 1 min)
> "What if the pipeline breaks? Let me ask Kiro..."
> Ask Kiro: "My pipeline is failing with permission denied error"
> Show Kiro suggesting the fix instantly

---

## SLIDE 9: How to Do the Live Demo — Preparation Checklist

### Before the Demo:

- [ ] EC2 instance is running (`pm2 status` shows `online`)
- [ ] App loads at http://13.233.173.78
- [ ] Git is clean (no uncommitted changes)
- [ ] GitHub Actions tab is ready to show
- [ ] Kiro IDE is open with the project
- [ ] Browser tabs ready:
  - Tab 1: Live app
  - Tab 2: GitHub Actions page
  - Tab 3: Kiro IDE (or share screen from IDE)

### Demo Change to Make (choose one):

**Option A: Simple text change (safest)**
```jsx
// In Dashboard.jsx, change a heading:
<h1>Welcome to Pi ERP</h1>
// → change to:
<h1>Welcome to Pi ERP ✨ Live Demo!</h1>
```

**Option B: Style change (more visible)**
```css
/* Change primary color or add a banner */
.dashboard-header { background: #667eea; }
```

**Option C: Add a feature (impressive but risky)**
```jsx
// Add a "Last Deployed" timestamp
<p>Last deployed: {new Date().toLocaleString()}</p>
```

### Backup Plan (if pipeline fails):
> "CI/CD pipelines can fail due to network issues. Let me show you 
> the GitHub Actions logs to demonstrate how we'd debug this..."
> Then show previous successful runs in the Actions history.

---

## SLIDE 10: Key Talking Points

### When explaining to the audience:

**On the Problem:**
> "Setting up CI/CD traditionally requires DevOps knowledge — YAML syntax, 
> SSH keys, Nginx configs, process managers. Most developers spend days 
> getting this right through trial and error."

**On Kiro's Solution:**
> "Kiro understands your project structure. I told it 'set up CI/CD 
> for this React + Express app on EC2' and it generated every config file 
> needed — all working together, all following best practices."

**On the Live Demo:**
> "Watch what happens when I push code. In 90 seconds, with zero manual 
> intervention, the change goes from my editor to a live server that 
> anyone in the world can access."

**On the Value:**
> "This isn't just about saving time. It's about reliability. Every deploy 
> is the same. No forgotten steps. No human errors. And if something breaks, 
> we have logs, we have history, and we can rollback in seconds."

---

## SLIDE 11: Summary — Why Kiro + CI/CD

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│   Traditional Way          Kiro Way                  │
│   ──────────────           ────────                  │
│   Research for hours  →    Describe what you need    │
│   Write YAML manually →    Kiro generates configs    │
│   Debug 10 failures   →    Works on first try        │
│   Forget to document  →    Docs auto-generated       │
│   One person knows    →    Anyone can maintain       │
│                                                      │
│   Result: 30 minutes setup, automated forever        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### The Pipeline in One Sentence:
> **Push code → GitHub Actions → SSH into EC2 → Build → Deploy → Live**

---

## SLIDE 12: Q&A Prep

### Anticipated Questions:

**Q: Can Kiro set up CI/CD for other cloud providers?**
A: Yes — AWS, Azure, GCP, DigitalOcean. You describe the target, Kiro generates the pipeline.

**Q: What if I need Docker or Kubernetes?**
A: Kiro can generate Dockerfiles, docker-compose, and k8s manifests. Same approach — describe what you need.

**Q: Is this production-ready?**
A: For a demo/small app, yes. For enterprise, you'd add: testing stage, staging environment, HTTPS, and monitoring. Kiro can help add those too.

**Q: What if Kiro generates wrong config?**
A: You review everything before deploying. Kiro explains what each line does, so you understand and can modify it.

**Q: How is this different from ChatGPT?**
A: Kiro has full context of your project — it reads your files, understands your structure, and generates configs that work with YOUR code. No copy-pasting from a generic answer.

---

## Quick Reference: Demo Commands

```bash
# Before demo - verify everything works
ssh -i hackathon-key.pem ubuntu@13.233.173.78 "pm2 status"

# During demo - push a change
git add .
git commit -m "live demo change"
git push origin main

# After demo - verify deployment
ssh -i hackathon-key.pem ubuntu@13.233.173.78 "pm2 logs --lines 5"
```

---

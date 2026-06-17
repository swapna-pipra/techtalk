# AWS Commands — Connect AWS to Your Project

---

## Step 1: Configure AWS CLI (Connect Your Machine to AWS)

```bash
aws configure
```
→ Links your local terminal to your AWS account using Access Key + Secret Key

```bash
# It will ask:
# AWS Access Key ID: YOUR_ACCESS_KEY_ID
# AWS Secret Access Key: YOUR_SECRET_ACCESS_KEY
# Default region: ap-south-1
# Output format: json
```

---

## Step 2: Verify AWS Connection

```bash
aws sts get-caller-identity
```
→ Confirms you're connected and shows your account ID + IAM username

---

## Step 3: EC2 Instance Commands

```bash
aws ec2 describe-instances --region ap-south-1 --query 'Reservations[*].Instances[*].[Tags[?Key==`Name`].Value|[0],State.Name,PublicIpAddress,InstanceId]' --output table
```
→ Lists all EC2 instances with name, status, IP, and ID

```bash
aws ec2 start-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```
→ Starts your EC2 instance (turns on the server)

```bash
aws ec2 stop-instances --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```
→ Stops your EC2 instance (turns off the server to save cost)

```bash
aws ec2 describe-instance-status --instance-ids i-0a6d1ed02993c29b8 --region ap-south-1
```
→ Shows detailed health status of your instance

---

## Step 4: SSH into EC2 (Connect to Your Server)

```bash
ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78
```
→ Opens a remote terminal session on your EC2 server

```bash
chmod 400 ~/Downloads/democ.pem
```
→ Secures the key file (required before SSH will accept it)

---

## Step 5: Deploy Project on EC2 (Inside SSH)

```bash
cd ~/hackathon && git pull origin main
```
→ Pulls latest code from GitHub to the server

```bash
npm ci && npm run build
```
→ Installs dependencies and builds the React frontend

```bash
sudo cp -r dist/* /var/www/html/
```
→ Copies built frontend files to Nginx's serving folder

```bash
cd server && npm ci --production
```
→ Installs backend dependencies (production only)

```bash
pm2 restart hackathon-backend
```
→ Restarts the Express backend server

```bash
sudo systemctl restart nginx
```
→ Restarts Nginx (the web server serving your app)

---

## Step 6: Check Everything is Working

```bash
curl -s -o /dev/null -w "%{http_code}" http://13.233.173.78/
```
→ Checks if frontend is responding (should show 200)

```bash
curl -s http://13.233.173.78/api/holidays
```
→ Checks if backend API is responding (should show JSON)

```bash
pm2 status
```
→ Shows if backend process is running (on EC2)

```bash
sudo systemctl status nginx
```
→ Shows if Nginx is running (on EC2)

---

## Step 7: View Logs (Debugging)

```bash
pm2 logs hackathon-backend
```
→ Shows live backend logs (errors, requests)

```bash
pm2 logs hackathon-backend --lines 20 --nostream
```
→ Shows last 20 lines of logs and exits

```bash
sudo tail -f /var/log/nginx/error.log
```
→ Shows Nginx errors in real-time

```bash
sudo tail -f /var/log/nginx/access.log
```
→ Shows every incoming request to your server

---

## Step 8: Security Group (Firewall)

```bash
aws ec2 describe-security-groups --region ap-south-1 --query 'SecurityGroups[*].[GroupName,GroupId,Description]' --output table
```
→ Lists all firewall rule groups in your account

```bash
aws ec2 authorize-security-group-ingress --group-id sg-XXXXX --protocol tcp --port 80 --cidr 0.0.0.0/0 --region ap-south-1
```
→ Opens port 80 (HTTP) to the public (needed for web access)

```bash
aws ec2 authorize-security-group-ingress --group-id sg-XXXXX --protocol tcp --port 22 --cidr YOUR_IP/32 --region ap-south-1
```
→ Opens port 22 (SSH) only for your IP address

---

## Step 9: Key Pairs

```bash
aws ec2 describe-key-pairs --region ap-south-1 --output table
```
→ Lists all SSH key pairs in your account

```bash
aws ec2 create-key-pair --key-name my-new-key --query 'KeyMaterial' --output text --region ap-south-1 > my-new-key.pem
```
→ Creates a new SSH key pair and saves it locally

---

## Step 10: Push Code to GitHub (Triggers CI/CD)

```bash
git add .
```
→ Stages all changed files for commit

```bash
git commit -m "your message"
```
→ Saves a snapshot of changes

```bash
git push origin main
```
→ Pushes code to GitHub, which triggers auto-deployment to EC2

---

## Quick Reference (All in Order)

```bash
# 1. Connect to AWS
aws configure

# 2. Verify connection
aws sts get-caller-identity

# 3. Check your instances
aws ec2 describe-instances --region ap-south-1 --output table

# 4. SSH into EC2
ssh -i ~/Downloads/democ.pem ubuntu@13.233.173.78

# 5. Deploy on EC2
cd ~/hackathon
git pull origin main
npm ci && npm run build
sudo cp -r dist/* /var/www/html/
cd server && npm ci --production
pm2 restart hackathon-backend
sudo systemctl restart nginx

# 6. Verify
curl http://13.233.173.78/
curl http://13.233.173.78/api/holidays

# 7. Exit EC2
exit

# 8. Push changes (triggers CI/CD)
git add . && git commit -m "update" && git push origin main
```

---

## How AWS Connects to Your Project (One Paragraph)

> You configure AWS CLI with your Access Key, which connects your terminal to AWS. You launch an EC2 instance (a virtual server in the cloud). You SSH into it using a .pem key file. On that server, you install Node.js, Nginx, and PM2. You clone your project from GitHub, build the React frontend, and serve it with Nginx on port 80. The Express backend runs on port 3001 via PM2. Nginx proxies /api/ requests to Express. For CI/CD, GitHub Actions uses your SSH key (stored as a secret) to automatically SSH into EC2 and redeploy whenever you push to main.

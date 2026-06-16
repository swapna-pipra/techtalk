#!/bin/bash
# ============================================================
# Quick Verification Script
# Run individual AWS CLI commands to check each step
# ============================================================

source .env

echo "=========================================="
echo "   AWS Verification Checks"
echo "=========================================="

echo ""
echo "1. AWS Identity:"
aws sts get-caller-identity

echo ""
echo "2. EC2 Instances:"
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=hackathon-app" "Name=instance-state-name,Values=running" \
  --query 'Reservations[].Instances[].{ID:InstanceId,IP:PublicIpAddress,State:State.Name,Type:InstanceType}' \
  --output table

echo ""
echo "3. Security Groups:"
aws ec2 describe-security-groups \
  --group-names hackathon-sg \
  --query 'SecurityGroups[].{ID:GroupId,Name:GroupName,Rules:IpPermissions[].{Port:FromPort,Source:IpRanges[0].CidrIp}}' \
  --output table 2>/dev/null || echo "Security group not found yet"

echo ""
echo "4. Key Pairs:"
aws ec2 describe-key-pairs \
  --key-names hackathon-key \
  --query 'KeyPairs[].{Name:KeyName,ID:KeyPairId}' \
  --output table 2>/dev/null || echo "Key pair not found yet"

echo ""
echo "=========================================="

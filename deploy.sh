#!/bin/bash

# Fountain Kiosk - Manual Netlify Deployment Script
# This script will guide you through deploying to Netlify

echo "======================================"
echo "Fountain Kiosk - Netlify Deployment"
echo "======================================"
echo ""

# Check if .next exists
if [ ! -d ".next" ]; then
    echo "❌ Build folder .next not found!"
    echo "Running build now..."
    npm run build
fi

echo "✅ Build folder ready"
echo ""
echo "Choose deployment method:"
echo ""
echo "1. Drag & Drop (Easiest - 30 seconds)"
echo "   - Opens browser to https://app.netlify.com/drop"
echo "   - Opens Finder to .next folder"
echo "   - Just drag .next into browser!"
echo ""
echo "2. Manual CLI Deploy (Advanced)"
echo "   - Runs: npx netlify deploy --prod --dir=.next"
echo "   - You'll need to answer prompts"
echo ""
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "Opening browser and Finder..."
    open "https://app.netlify.com/drop"
    open ".next"
    echo ""
    echo "✅ Now drag the .next folder into your browser!"
    echo "   You'll get a live URL in ~30 seconds"
elif [ "$choice" = "2" ]; then
    echo ""
    echo "Starting Netlify CLI deployment..."
    echo "Follow the prompts below:"
    echo ""
    npx netlify deploy --prod --dir=.next
else
    echo "Invalid choice"
    exit 1
fi

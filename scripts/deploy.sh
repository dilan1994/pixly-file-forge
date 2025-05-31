#!/bin/bash

# Pixly Forge PWA Deployment Script
echo "🚀 Starting Pixly Forge PWA deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes."
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests (if any)
echo "🧪 Running tests..."
npm run test --if-present

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Add all changes
echo "📝 Adding changes to git..."
git add .

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo "ℹ️  No changes to commit."
else
    # Commit changes
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="🚀 Deploy: Update PWA with latest changes"
    fi
    git commit -m "$COMMIT_MSG"
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin $CURRENT_BRANCH

echo "✅ Deployment initiated! Check GitHub Actions for build status."
echo "🔗 Your app will be available at: https://dilan1994.github.io/pixly-file-forge/"
echo "📊 Monitor deployment: https://github.com/dilan1994/pixly-file-forge/actions" 
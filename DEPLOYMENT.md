# 🚀 Pixly Forge PWA Deployment Guide

This guide explains how to deploy your Pixly Forge PWA to GitHub Pages with automatic updates.

## 🔧 Setup (One-time)

### 1. Enable GitHub Pages
1. Go to your repository: `https://github.com/dilan1994/pixly-file-forge`
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Repository Permissions
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Save the settings

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)
Every time you push to the `main` or `master` branch, your app will automatically deploy:

```bash
# Make your changes
git add .
git commit -m "✨ Add new features"
git push origin main
```

### Method 2: Using the Deployment Script
Use the provided deployment script for a guided deployment:

```bash
# Run the deployment script
npm run deploy

# Or directly:
./scripts/deploy.sh
```

### Method 3: Manual Deployment
For more control over the deployment process:

```bash
# 1. Build the application
npm run build

# 2. Commit and push changes
git add .
git commit -m "🚀 Deploy: Update PWA"
git push origin main
```

## 📊 Monitoring Deployment

### Check Deployment Status
- **GitHub Actions**: https://github.com/dilan1994/pixly-file-forge/actions
- **Live App**: https://dilan1994.github.io/pixly-file-forge/

### Deployment Commands
```bash
# Check git status
npm run deploy:check

# Build only (no deployment)
npm run deploy:build

# Full deployment with linting
npm run predeploy
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check for TypeScript errors
npm run lint

# Fix and rebuild
npm run build
```

#### 2. GitHub Pages Not Updating
- Check GitHub Actions tab for failed workflows
- Ensure GitHub Pages is set to "GitHub Actions" source
- Verify repository permissions

#### 3. PWA Features Not Working
- Ensure HTTPS is enabled (GitHub Pages provides this)
- Check browser console for service worker errors
- Verify manifest.json is accessible

### Debug Commands
```bash
# Check current branch
git branch --show-current

# Check remote repository
git remote -v

# Check deployment status
git log --oneline -5
```

## 🌟 PWA Features After Deployment

Once deployed, your app will have:

- ✅ **Offline Support**: Works without internet
- ✅ **Install Prompts**: Users can install as native app
- ✅ **Push Notifications**: Update notifications
- ✅ **Background Sync**: Sync when connection returns
- ✅ **Mobile Optimized**: Touch gestures and camera integration
- ✅ **Auto Updates**: 7-day update scheduling

## 📱 Testing PWA Features

### On Desktop
1. Open Chrome DevTools → Application tab
2. Check **Manifest** and **Service Workers**
3. Test offline mode in Network tab

### On Mobile
1. Visit the deployed URL
2. Look for "Add to Home Screen" prompt
3. Test camera integration and gestures

## 🔄 Update Workflow

1. **Develop**: Make changes locally (`npm run dev`)
2. **Test**: Verify features work (`npm run build`)
3. **Deploy**: Push to GitHub (`git push origin main`)
4. **Monitor**: Check GitHub Actions for deployment status
5. **Verify**: Test live app at deployment URL

## 📞 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify all dependencies are installed
3. Ensure your local build works before deploying
4. Check browser console for errors

---

**Live App**: https://dilan1994.github.io/pixly-file-forge/
**Repository**: https://github.com/dilan1994/pixly-file-forge
**Actions**: https://github.com/dilan1994/pixly-file-forge/actions 
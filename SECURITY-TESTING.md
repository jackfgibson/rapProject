# Security Testing Setup

This project includes intentional secrets for testing our CI/CD security scanning tools.

## 🔍 Security Tools Implemented

### TruffleHog (Secret Scanning)
- **Purpose**: Detects hardcoded secrets, API keys, and credentials
- **Test File**: `test-secrets.js`
- **Configuration**: Uses official TruffleHog GitHub Action structure
- **Expected Detections**:
  - AWS Access Keys
  - GitHub Personal Access Tokens
  - Slack Webhook URLs
  - API Keys (various formats)
  - Database connection strings with passwords
  - JWT secrets
  - RSA Private Keys
  - Stripe API keys

## ⚠️ IMPORTANT WARNINGS

### DO NOT USE IN PRODUCTION!
- The secrets in `test-secrets.js` are fake but follow real patterns
- These files are for CI/CD testing purposes only

## 🚀 How to Test

### Prerequisites
- No additional setup required! TruffleHog works out of the box.

### Running Tests
1. **Push to main/develop branch** or **create a pull request**
2. **GitHub Actions will run** and should show:
   - ✅ TruffleHog finding secrets in `test-secrets.js`
   - ❌ **Build will FAIL** when secrets are detected (this is the desired behavior!)

### Expected Results
- **TruffleHog**: Should detect ~8-10 different types of secrets
- **Build Status**: Will show as failed/red due to detected secrets
- **GitHub Actions Log**: Detailed secret detection results

## 🧹 Cleanup After Testing

Once you've verified TruffleHog is working:

1. **Remove test files**:
   ```bash
   rm test-secrets.js
   rm SECURITY-TESTING.md
   ```

2. **Commit the cleanup**:
   ```bash
   git add .
   git commit -m "Remove security testing files"
   git push
   ```

## 📊 Monitoring Results

- **GitHub Actions Tab**: View detailed TruffleHog logs
- **Pull Request Checks**: See security status on PRs
- **Build Status**: Red/failed when secrets detected, green when clean

## 🔧 Customizing TruffleHog Settings

### Current Configuration
```yaml
- name: Secret Scanning
  uses: trufflesecurity/trufflehog@main
  with:
    extra_args: --results=verified,unknown
```

### Available Options
- `--results=verified` - Only verified secrets (reduces false positives)
- `--results=unknown` - Only potential secrets (may include false positives)  
- `--results=verified,unknown` - Both verified and potential (current setting)
- `--exclude-paths=file1,file2` - Skip specific files
- `--exclude-detectors=detector1,detector2` - Skip specific secret types

## 🎯 Success Criteria

Your TruffleHog setup is working correctly if:
- [x] TruffleHog reports found secrets in the GitHub Actions log
- [x] Build fails (red status) when secrets are detected
- [x] Build passes (green status) when no secrets are present
- [x] Secret detection appears in GitHub Actions detailed logs
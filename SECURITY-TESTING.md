# Code Quality & Security Setup

This project implements comprehensive code quality and security analysis in the CI/CD pipeline.

## 🔍 Security & Quality Tools Implemented

### TruffleHog (Secret Scanning)
- **Purpose**: Detects hardcoded secrets, API keys, and credentials
- **Configuration**: Uses official TruffleHog GitHub Action
- **Integration**: Runs automatically on every push and pull request
- **Detection Types**:
  - AWS Access Keys
  - GitHub Personal Access Tokens
  - Slack Tokens
  - API Keys (various formats)
  - Database connection strings with passwords
  - JWT secrets
  - RSA Private Keys
  - Stripe API keys

### CodeQL (Code Security Analysis)
- **Purpose**: Static analysis for security vulnerabilities and code quality
- **Configuration**: GitHub's official CodeQL action
- **Languages**: JavaScript/Node.js
- **Queries**: Security-extended + Quality rules
- **Detection Types**:
  - SQL Injection vulnerabilities
  - Cross-site scripting (XSS)
  - Path traversal attacks
  - Code injection
  - Authentication bypass
  - Data flow analysis

### SonarCloud (Code Quality & Security)
- **Purpose**: Comprehensive code quality, security, and maintainability analysis
- **Integration**: SonarCloud.io platform
- **Features**:
  - Code smells detection
  - Security hotspots
  - Bugs and vulnerabilities
  - Code coverage analysis
  - Technical debt measurement
  - Duplication detection

## 🚀 Setup Instructions

### SonarCloud Setup
1. **Create SonarCloud Account**:
   - Go to [SonarCloud.io](https://sonarcloud.io)
   - Sign up with your GitHub account
   - Import your repository

2. **Configure Organization**:
   - Create organization: `jackfgibson`
   - Set project key: `jackfgibson_rapProject`

3. **Generate Token**:
   - Go to Account → Security → Generate Token
   - Add as `SONAR_TOKEN` in GitHub repository secrets

### CodeQL Setup
- **No additional setup required!** 
- CodeQL is built into GitHub and works automatically
- Results appear in Security tab → Code scanning alerts

### Pipeline Execution
1. **CodeQL Initialize**: Sets up static analysis scanning
2. **Autobuild**: Automatically builds the project for analysis
3. **CodeQL Analyze**: Performs security and quality analysis
4. **SonarCloud Scan**: Comprehensive code quality analysis
5. **Secret Scanning**: TruffleHog checks for leaked secrets

### Results & Monitoring
- **GitHub Security Tab**: CodeQL findings and alerts
- **SonarCloud Dashboard**: Detailed quality metrics and trends
- **Pull Request Checks**: All tools provide status checks
- **GitHub Actions Log**: Detailed scanning results

## 🔧 Configuration Files

### GitHub Actions Workflow
```yaml
permissions:
  security-events: write
  contents: read
  actions: read

- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript
    queries: security-extended,quality

- name: Autobuild  
  uses: github/codeql-action/autobuild@v3

- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v3

- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@master
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### SonarCloud Configuration (`sonar-project.properties`)
```properties
sonar.projectKey=jackfgibson_rapProject
sonar.organization=jackfgibson
sonar.sources=.
sonar.exclusions=node_modules/**,*.md
```

## 📊 Monitoring Results

- **GitHub Actions Tab**: View detailed TruffleHog logs
- **Pull Request Checks**: See security status on PRs
- **Build Status**: Red/failed when secrets detected, green when clean

## 🔧 Customization Options

### Available Configuration
- `--results=verified` - Only verified secrets (reduces false positives)
- `--results=unknown` - Only potential secrets (may include false positives)  
- `--results=verified,unknown` - Both verified and potential (current setting)
- `--exclude-paths=file1,file2` - Skip specific files
- `--exclude-detectors=detector1,detector2` - Skip specific secret types

### Example Configurations
```yaml
# More strict (only verified secrets)
extra_args: --results=verified

# Include all potential secrets
extra_args: --results=verified,unknown

# Exclude specific file types
extra_args: --results=verified,unknown --exclude-paths=*.md,*.txt
```

## 🎯 Benefits

Your security pipeline provides:
- ✅ **Automatic secret detection** in code commits
- ✅ **Prevention of secret leaks** to production
- ✅ **Continuous monitoring** of your codebase
- ✅ **Integration with CI/CD** pipeline
- ✅ **Real-time feedback** on security issues
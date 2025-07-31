// THIS FILE CONTAINS INTENTIONAL SECRETS FOR TESTING TRUFFLEHOG
// DO NOT USE IN PRODUCTION!

const config = {
  // Real AWS access key pattern (inactive key for testing)
  aws_access_key_id: "AKIAIOSFODNN7EXAMPLE",
  aws_secret_access_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  
  // GitHub Personal Access Token (classic format)
  github_token: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
  // GitHub Fine-grained PAT
  github_pat: "github_pat_11ABCDEFG0001234567890_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  
  // Slack Bot Token
  slack_bot_token: "xoxb-1234567890123-1234567890123-xxxxxxxxxxxxxxxxxxxx",
  
  // Slack Webhook URL
  slack_webhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
  
  // OpenAI API Key
  openai_api_key: "sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  
  // Stripe Keys
  stripe_secret_key: "sk_live_51AbCdEf1234567890123456789012345678901234567890123456789012",
  stripe_publishable_key: "pk_live_51AbCdEf1234567890123456789012345678901234567890123456789012",
  
  // Discord Bot Token  
  discord_token: "MTI3NzM0OTI4NjA5ODc4NDI1Ng.GhJkLm.OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzA",
  
  // Twitter API Key
  twitter_api_key: "1234567890123456789012345",
  twitter_api_secret: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV",
  
  // JWT Secret
  jwt_secret: "your-256-bit-secret-key-here-make-it-long-enough-for-security",
  
  // Database URLs
  postgres_url: "postgresql://username:password123@localhost:5432/database",
  mysql_url: "mysql://root:secretpassword@localhost:3306/myapp",
  
  // Private SSH Key
  ssh_private_key: `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP
QRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX
-----END OPENSSH PRIVATE KEY-----`
};

// Some hardcoded secrets that should trigger TruffleHog
const API_KEY = "sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const SLACK_TOKEN = "xoxb-1234567890123-1234567890123-xxxxxxxxxxxxxxxxxxxx";
const DISCORD_BOT_TOKEN = "MTI3NzM0OTI4NjA5ODc4NDI1Ng.GhJkLm.OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzA";

// Direct secret usage in code
function connectToAWS() {
  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: 'us-east-1'
  });
}

function authenticateGitHub() {
  const { Octokit } = require("@octokit/rest");
  const octokit = new Octokit({
    auth: "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  });
}

function slackNotify() {
  const webhook = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX";
  // Send notification logic here
}

// Environment variable that contains a secret (bad practice)
process.env.SECRET_KEY = "sk-live-51AbCdEf1234567890123456789012345678901234567890123456789012";

module.exports = config;
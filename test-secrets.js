// THIS FILE CONTAINS INTENTIONAL SECRETS FOR TESTING TRUFFLEHOG
// DO NOT USE IN PRODUCTION!

const config = {
  // AWS credentials - TruffleHog should detect this
  aws_access_key_id: "AKIAIOSFODNN7EXAMPLE",
  aws_secret_access_key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  
  // GitHub token - TruffleHog should detect this
  github_token: "ghp_1234567890abcdef1234567890abcdef12345678",
  
  // Slack webhook - TruffleHog should detect this
  slack_webhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
  
  // API key patterns that should trigger alerts
  api_key: "sk-1234567890abcdef1234567890abcdef",
  secret_key: "sk_test_1234567890abcdef1234567890abcdef",
  
  // Database connection string with password
  database_url: "postgresql://user:pa$$w0rd123@localhost:5432/mydb",
  
  // JWT secret (weak but recognizable pattern)
  jwt_secret: "super-secret-jwt-key-that-should-not-be-here-12345",
  
  // Private key
  private_key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdef1234567890abcdef1234567890abcdef
1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
-----END RSA PRIVATE KEY-----`,

  // Stripe keys
  stripe_publishable: "pk_test_1234567890abcdef1234567890abcdef",
  stripe_secret: "sk_test_1234567890abcdef1234567890abcdef"
};

// Some functions that use these secrets (to make it look realistic)
function connectToAWS() {
  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
    region: 'us-east-1'
  });
}

function authenticateGitHub() {
  const { Octokit } = require("@octokit/rest");
  const octokit = new Octokit({
    auth: config.github_token,
  });
}

module.exports = config;
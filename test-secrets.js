// THIS FILE CONTAINS INTENTIONAL SECRETS FOR TESTING TRUFFLEHOG
// DO NOT USE IN PRODUCTION!

// AWS Secret Access Key (from TruffleHog test cases)
const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// GitHub Personal Access Token (test pattern)
const GITHUB_TOKEN = "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";

// Slack Bot Token (realistic test pattern)
const SLACK_TOKEN = "xoxb-263733479459-2142833311892-3Xn4jUo6rMQ4xRLFRHxhbqP5";

// OpenAI API Key (test pattern)
const OPENAI_KEY = "sk-1234567890abcdef1234567890abcdef1234567890abcdef";

// High entropy string (should trigger detection)
const SECRET_KEY = "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8";

// Database URL with password
const DATABASE_URL = "postgresql://user:pa55word@localhost:5432/database";

// JWT Secret
const JWT_SECRET = "your-256-bit-secret";

// SSH Private Key
const SSH_KEY = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA3I5l5cPdPiRF6YpHX9CX+5LJ2Lm3
-----END OPENSSH PRIVATE KEY-----`;

// Hardcoded secrets in different contexts
var api_key = "sk-1234567890abcdef1234567890abcdef1234567890abcdef";
let password = "SuperSecretPassword123!";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const config = {
  aws_secret: AWS_SECRET,
  github_token: GITHUB_TOKEN,
  slack_token: SLACK_TOKEN,
  openai_key: OPENAI_KEY,
  secret_key: SECRET_KEY,
  database_url: DATABASE_URL,
  jwt_secret: JWT_SECRET,
  ssh_key: SSH_KEY,
  api_key: api_key,
  password: password,
  token: token
};

module.exports = config;
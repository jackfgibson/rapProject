// THIS FILE CONTAINS INTENTIONAL SECRETS FOR TESTING TRUFFLEHOG
// DO NOT USE IN PRODUCTION!

// Real AWS credentials (example from AWS docs)
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// GitHub Classic Personal Access Token
const GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// Slack Bot Token
const SLACK_BOT_TOKEN = "xoxb-1234567890123-1234567890123-xxxxxxxxxxxxxxxxxxxx";

// OpenAI API Key
const OPENAI_API_KEY = "sk-proj-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Stripe Secret Key 
const STRIPE_SECRET = "sk_live_51AbCdEf1234567890123456789012345678901234567890123456789012";

// Discord Bot Token
const DISCORD_TOKEN = "MTI3NzM0OTI4NjA5ODc4NDI1Ng.GhJkLm.OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzA";

// Private Key (RSA)
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEF
GHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890ab
-----END RSA PRIVATE KEY-----`;

const config = {
  aws_access_key: AWS_ACCESS_KEY_ID,
  aws_secret: AWS_SECRET_ACCESS_KEY,
  github_token: GITHUB_TOKEN,
  slack_token: SLACK_BOT_TOKEN,
  openai_key: OPENAI_API_KEY,
  stripe_key: STRIPE_SECRET,
  discord_token: DISCORD_TOKEN,
  private_key: PRIVATE_KEY
};

module.exports = config;
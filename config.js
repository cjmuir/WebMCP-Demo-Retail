// PingOne OIDC Configuration
// Replace these values with your PingOne environment settings
// For GitHub Pages deployment, set these directly or via a build step

const CONFIG = {
  // Your PingOne Application Client ID
  PINGONE_CLIENT_ID: "1e9994ca-366d-4954-b1d8-32c3506e9641",

  // Your PingOne Environment ID
  PINGONE_ENVIRONMENT_ID: "3f720e3e-ceb4-43a7-bb45-45b05eb26280",

  // Redirect URI — must match what's registered in PingOne
  // For local dev: http://localhost:8080
  // For GitHub Pages: https://yourusername.github.io/WebMCP-Retail/
  // Auto-derived from the current page URL (query string stripped).
  // This must exactly match a Redirect URI registered in your PingOne application.
  // Override with a hardcoded string if auto-detection doesn't match your registration.
  PINGONE_REDIRECT_URI: window.location.origin + window.location.pathname,

  // OIDC scopes to request
  PINGONE_SCOPES: "openid profile email",

  // Backend API base URL — auto-detected by environment:
  //   localhost / 127.0.0.1  →  Node.js server (docker-compose up in server/)
  //   GitHub Pages           →  static api/ files (demo mode, simulated checkout)
  // To point at a real k8s deployment, replace the third branch with your ingress URL:
  //   : "https://shopapi.your-domain.com/api"
  SHOP_API_BASE: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000/api"
    : window.location.origin + window.location.pathname.replace(/\/$/, "") + "/api",
};

// Derived: PingOne authorization server base URL
CONFIG.PINGONE_AS_BASE = `https://auth.pingone.com/${CONFIG.PINGONE_ENVIRONMENT_ID}/as`;

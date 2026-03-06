// PingOne OIDC Configuration
// Replace these values with your PingOne environment settings
// For GitHub Pages deployment, set these directly or via a build step

const CONFIG = {
  // Your PingOne Application Client ID
  PINGONE_CLIENT_ID: "e7da5776-f2a1-4462-89ad-567cc1f6f50c",

  // Your PingOne Environment ID
  PINGONE_ENVIRONMENT_ID: "24a73b24-2a28-48fc-b9ad-6df0c3bcc383",

  // Redirect URI — must match what's registered in PingOne
  // For local dev: http://localhost:8080
  // For GitHub Pages: https://yourusername.github.io/WebMCP-Retail/
  // Auto-derived from the current page URL (query string stripped).
  // This must exactly match a Redirect URI registered in your PingOne application.
  // Override with a hardcoded string if auto-detection doesn't match your registration.
  PINGONE_REDIRECT_URI: "https://cjmuir.github.io/WebMCP-Demo-Retail/",

  // OIDC scopes to request
  PINGONE_SCOPES: "openid profile email",

  // Backend API base URL.
  // ?apiBase= query param overrides (persisted in sessionStorage so it survives
  // the OIDC redirect) — useful for pointing a deployed frontend at a local server:
  //   https://cprice-ping.github.io/WebMCP-Demo-Retail/?apiBase=http://localhost:3000/api
  SHOP_API_BASE: (() => {
    const param = new URLSearchParams(window.location.search).get("apiBase");
    if (param) { sessionStorage.setItem("apiBase", param); return param; }
    const stored = sessionStorage.getItem("apiBase");
    const onLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    // Discard a stored localhost URL when running on a remote origin (e.g. GitHub Pages)
    const storedIsLocal = stored && (stored.includes("localhost") || stored.includes("127.0.0.1"));
    if (stored && !(storedIsLocal && !onLocalhost)) return stored;
    return "https://your-k8s-api-domain/api";
  })(),
};

// Derived: PingOne authorization server base URL
CONFIG.PINGONE_AS_BASE = `https://auth.pingone.com/${CONFIG.PINGONE_ENVIRONMENT_ID}/as`;

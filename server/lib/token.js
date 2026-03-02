// ============================================================
// AT validation — full JWKS signature check server-side.
// The browser can only read the payload; the server holds the
// public JWKS and verifies the signature properly.
// ============================================================

import { createRemoteJWKSet, jwtVerify } from "jose";

// PingOne publishes its JWKS at a well-known URL under the environment path.
// createRemoteJWKSet fetches and caches the key set automatically.
const envId = () => {
  const id = process.env.PINGONE_ENVIRONMENT_ID;
  if (!id) throw new Error("PINGONE_ENVIRONMENT_ID is not set");
  return id;
};

let _jwks = null;
function getJWKS() {
  if (!_jwks) {
    _jwks = createRemoteJWKSet(
      new URL(`https://auth.pingone.com/${envId()}/as/jwks`)
    );
  }
  return _jwks;
}

/**
 * Validate a PingOne access token.
 *
 * Checks performed (server-side, with full key material):
 *   ✓ JWT signature  — using fetched + cached JWKS
 *   ✓ exp            — token is not expired
 *   ✓ iss            — issuer matches the configured environment
 *   ✓ aud            — optional; set PINGONE_API_AUDIENCE if your RS has a specific audience
 *
 * @param {string} token  Raw JWT string (the Bearer credential)
 * @returns {Promise<object>}  Decoded payload claims
 * @throws  if the token is invalid, expired, or the JWKS fetch fails
 */
export async function validateAccessToken(token) {
  const options = {
    issuer: `https://auth.pingone.com/${envId()}/as`,
  };

  // Audience check is optional — only enforce it if the variable is set.
  // PingOne access tokens may not carry a specific `aud` for all RS configs.
  if (process.env.PINGONE_API_AUDIENCE) {
    options.audience = process.env.PINGONE_API_AUDIENCE;
  }

  const { payload } = await jwtVerify(token, getJWKS(), options);
  return payload;
}

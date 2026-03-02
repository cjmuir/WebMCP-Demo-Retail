# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Run as non-root for security
RUN addgroup -S shopapi && adduser -S shopapi -G shopapi

COPY --from=build /app/node_modules ./node_modules
COPY package.json  ./
COPY server.js     ./
COPY routes/       ./routes/
COPY lib/          ./lib/
COPY products.json ./

USER shopapi

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "server.js"]

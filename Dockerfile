# ---- deps: install dependencies only, cached separately from source so rebuilds are fast ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: build the Next.js app ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public (non-secret) Sanity config, needed at BUILD time because Next.js inlines
# NEXT_PUBLIC_* variables into the client bundle when it builds. These match .env.example —
# not secrets, safe to bake into the image.
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=bkxauu92
ENV NEXT_PUBLIC_SANITY_DATASET=production
ENV NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

RUN npm run build

# ---- runner: minimal production image, just the built output ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# next.config.ts has output: "standalone", so .next/standalone contains a self-contained
# server.js plus only the node_modules it actually needs — no full node_modules copy required.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

# 1) shared base with node + pnpm prepped
FROM node:23-alpine AS base
RUN apk add --no-cache libc6-compat \
 && corepack enable \
 && corepack prepare pnpm@latest --activate

# 2) builder: full install + turbo prune
FROM base AS builder
WORKDIR /apps

# bring in the manifests
COPY package.json pnpm-lock.yaml ./

# install everything (includes tsconfig-paths if it's in dependencies)
RUN pnpm install --frozen-lockfile

# copy source & prune down to services_template
COPY . .
RUN pnpm dlx turbo prune services_template --docker

# 3) installer: install pruned dependencies & build
FROM base AS installer
WORKDIR /apps

# pruned package.json + lockfile only
COPY --from=builder /apps/out/json/ ./

# install exactly those (fast, cache-efficient)
RUN pnpm install --frozen-lockfile

# bring in your source and compiled deps
COPY --from=builder /apps/out/full/ ./

# build the actual service
RUN pnpm turbo build

# 4) runtime: just the compiled output
FROM node:23-alpine AS runner
WORKDIR /apps

# drop root privileges
RUN addgroup --system --gid 1001 expressjs \
 && adduser  --system --uid 1001 \
              --ingroup expressjs \
              --home /nonexistent \
              expressjs

RUN mkdir -p logs \
 && chown expressjs:expressjs logs
 
USER expressjs

# copy only built files & prod deps
COPY --from=installer /apps ./

VOLUME ["/apps/logs"]

# run without tsconfig-paths preloading since alias paths are already rewritten
CMD ["node", "apps/services_template/dist/index.js"]

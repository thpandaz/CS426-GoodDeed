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
RUN pnpm dlx turbo prune web --docker

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

FROM nginx:alpine AS runner

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy your built files into nginx's webroot
COPY --from=installer /apps/apps/web/dist /usr/share/nginx/html

# Expose port 80 (you can remap with -p when running)
EXPOSE 80

# Launch nginx in foreground
CMD ["nginx", "-g", "daemon off;"]


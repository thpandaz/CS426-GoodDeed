# Use Bun's official Alpine image as the base
FROM oven/bun:alpine AS base

# Builder stage: Set up the pruned workspace for services_template
FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

# Install Turbo using Bun so bunx can run it
RUN bun add turbo

# Copy the entire repository into the container
COPY . .

# Generate a lockfile by installing dependencies (this creates bun.lockb)
RUN bun install

# Now run Turbo prune using bunx
RUN bunx turbo prune app --docker

# Installer stage: Install dependencies and build the project
FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

# Copy the pruned JSON output (lockfiles and package.jsons)
COPY --from=builder /app/out/json/ .

# Install dependencies using Bun
RUN bun install

# Copy the full pruned workspace
COPY --from=builder /app/out/full/ .

# Build the project using Turbo
RUN bunx turbo build

# Runner stage: Set up a non-root user and run the built API
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 expressjs && \
    adduser --system --uid 1001 expressjs
USER expressjs

# Start the built API using Bun (adjust the path if needed)
CMD bun app/services_template/dist/index.js

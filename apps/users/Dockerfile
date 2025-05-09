FROM node:23-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install curl (as in original)
RUN apk add --no-cache curl

# Copy pnpm-specific files, root package.json, and turbo.json
# These are needed for pnpm to understand the workspace and for turbo to run.
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./

# Copy all package manifests (package.json files from all apps and packages)
# This allows pnpm to correctly resolve workspace dependencies for the --filter command.
COPY apps/ ./apps/
COPY packages/ ./packages/

# Install dependencies only for the 'users' service and its workspace dependencies.
# Using --frozen-lockfile to ensure it uses the versions from pnpm-lock.yaml.
RUN pnpm install --filter users... --frozen-lockfile

# Copy all source code from the monorepo root.
# Turbo will use this to build the 'users' service and its dependencies.
COPY . .

# Build only the 'users' service and its dependencies using turbo.
# The 'users' package's build script (e.g., "tsc") will be executed.
RUN pnpm turbo run build --filter=users

# Command to start the 'users' service.
# The build output for 'users' (from 'tsc') is typically in 'dist/index.js'
# relative to the 'apps/users' directory.
# So, the path inside the container will be /app/apps/users/dist/index.js.
CMD ["node", "apps/users/dist/index.js"]

# ---------------------------
# 1) Base Image
# ---------------------------
FROM oven/bun:alpine AS base
RUN apk update && apk add --no-cache libc6-compat

# ---------------------------
# 2) Builder Stage
# ---------------------------
# We set the working directory to /app, which will contain the entire repo.
FROM base AS builder
WORKDIR /app
# Debug: list all files after setting working directory

# Copy the entire repository (build context is the repo root)
COPY . .

# Change directory to the web app folder, install dependencies, and build.
RUN cd apps/web && bun install && bunx turbo run build --filter=web

# Debug: list files in the web folder after build to confirm that dist exists.
RUN cd apps/web && echo "After build:" && ls -lR

# ---------------------------
# 3) Runner (Production) Stage
# ---------------------------
FROM base AS runner
# Create a non-root user for security.
RUN addgroup --system --gid 1001 bunuser && adduser --system --uid 1001 bunuser
USER bunuser

# Set working directory to /app.
WORKDIR /app
# Debug: list files in /app to check structure

# (Optional) Install a lightweight static server to serve the built files.
RUN bun add serve

# Copy only the web build output from the builder stage.
# The build output is at /app/apps/web/dist.
COPY --from=builder /app/apps/web/dist ./dist

# Expose the port that the static server will listen on.
EXPOSE 3000

# Run the static server using bunx (adjust the command if needed).
CMD ["bunx", "serve", "dist", "-l", "3000"]

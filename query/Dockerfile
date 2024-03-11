# Use the base node image from Docker Hub
FROM node:alpine AS base

# Set the environment variable for PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable Corepack to use pnpm
RUN corepack enable

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml (or package-lock.json) files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies including devDependencies for build
# Note: This is temporary just to run the build script
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Install only production dependencies
FROM base AS prod-deps
COPY --from=build /app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Final stage: Copy over the production dependencies and built dist folder
FROM base AS final
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Command to run the application
CMD ["node", "dist/index.js"]

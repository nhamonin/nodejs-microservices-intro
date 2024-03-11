# Use the base Node.js image
FROM node:alpine AS development

# Enable Corepack to use pnpm
RUN corepack enable

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to utilize Docker cache
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies since it's for development)
RUN pnpm install --frozen-lockfile

# Copy the rest of your application's source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# The default command to run your application using pnpm dev for live reloading
CMD ["pnpm", "run", "dev"]

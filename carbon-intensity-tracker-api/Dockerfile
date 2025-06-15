# Use official Node.js image
FROM node:22

# Install native build deps
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    pkg-config \
    libsqlite3-dev

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the application
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]

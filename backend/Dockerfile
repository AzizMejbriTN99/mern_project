# Use official Node.js LTS image
FROM node:22-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "start"]
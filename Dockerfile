# Use a lightweight Node.js base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
# This allows Docker to cache the npm install step if only code changes
COPY package*.json ./

# Install dependencies
RUN npm install firebase-admin express

# Copy the rest of the application files
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]
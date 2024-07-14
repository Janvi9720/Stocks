# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json files
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm run install-server
RUN npm run install-client

# Copy the rest of the application code
COPY . .

# Build the client
RUN npm run build-client

# Expose the port the app runs on
EXPOSE 3000 5000

# Command to run the application
CMD npm run start-server & npm run start-client
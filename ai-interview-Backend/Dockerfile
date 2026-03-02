# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Expose port (change if needed)
EXPOSE 5000

# Start app
CMD [ "npm" , "start" ]
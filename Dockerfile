FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install --ignore-scripts

# Copy application and test source
COPY app.js cucumber.js ./
COPY features/ ./features/

# Default command runs all tests (both languages)
CMD ["npm", "test"]

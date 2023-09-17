# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /frontend

# Set Node environment to production
ENV NODE_ENV production

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.21.3-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app to nginx web root directory
COPY --from=build /build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start nginx
CMD [ "nginx", "-g", "daemon off;" ]

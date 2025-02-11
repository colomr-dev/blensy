# Use the official nginx image as base
FROM nginx:alpine

# Install required packages for SSL
RUN apk add --no-cache openssl

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Copy the built files to nginx
COPY . /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 443 for HTTPS
EXPOSE 443

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
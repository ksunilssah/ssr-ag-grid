# Use nginx alpine
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf || true

# Copy custom nginx config
COPY config/nginx.conf /etc/nginx/nginx.conf

# Copy built static files
COPY dist /usr/share/nginx/html

# Use custom entrypoint to generate app-config.json from env vars
COPY config/generate-app-config.sh /generate-app-config.sh
RUN chmod +x /generate-app-config.sh

EXPOSE 80

ENTRYPOINT ["/generate-app-config.sh"]

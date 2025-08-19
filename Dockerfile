# Use OpenResty (nginx + Lua)
FROM openresty/openresty:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf || true

# Install lua-cjson for JSON encoding
RUN apk add --no-cache lua-cjson

# Copy custom nginx config
COPY config/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

# Copy built static files
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["openresty", "-g", "daemon off;"]

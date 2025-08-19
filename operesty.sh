#!/bin/bash

set -e

# Load OpenResty image from tarball
echo "Loading OpenResty image from public/openresty-alpine.tar.gz..."
docker load -i public/openresty-alpine.tar.gz

# Build your app image
echo "Building ssr-ag-grid Docker image..."
docker build -t ssr-ag-grid .

echo "Done! You can now run your container with:"
echo "docker run -e AUTH_URL='abc.com' -e LOGO_OUT_URL='abc.com/logout' -p 8080:80 ssr-ag-grid"
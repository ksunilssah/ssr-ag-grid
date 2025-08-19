#!/bin/sh
set -e

echo "Generating app-config.json from environment variables..."
cat <<EOF > /usr/share/nginx/html/app-config.json
{
  "authUrl": "${AUTH_URL}",
  "logoOutUrrl": "${LOGO_OUT_URL}"
}
EOF

nginx -g 'daemon off;'
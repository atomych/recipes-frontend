#!/bin/sh
mkdir -p /usr/share/nginx/html/public
echo "window.VUE_APP_API_URL='${VUE_APP_API_URL}';" > /usr/share/nginx/html/public/config.js
exec "$@"

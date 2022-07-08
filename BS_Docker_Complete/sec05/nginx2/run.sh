docker run \
  -p 7777:80 \
  -v $(pwd):/usr/share/nginx/html \
  --name nginx2 \
  nginx
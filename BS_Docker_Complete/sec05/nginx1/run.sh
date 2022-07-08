docker run \
  -p 5555:80 \
  -v $PWD:/usr/share/nginx/html \
  --name nginx1 \
  nginx
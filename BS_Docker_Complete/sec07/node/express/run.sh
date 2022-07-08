# docker run -it \
#   -v $(pwd):/app \
#   -w /app \
#   node \
#   npm init -y;

# docker run -it \
#   -v $(pwd):/app \
#   -w /app \
#   node \
#   npm install express;

docker run -it \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node \
  node index.js;
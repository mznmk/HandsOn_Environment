#!/bin/sh

# build image
docker build -t node-app-image .

# # run container
# docker run -d --name node-app node-app-image

# # run container (port: local/docker)
# docker run -d -p 3000:3000 --name node-app node-app-image

# # run container (mount: local/docker)
# docker run -v $(pwd):/app -d -p 3000:3000 --name node-app node-app-image

# run container (mount: node_modules)
docker run -v $(pwd):/app -v /app/node_modules -d -p 3000:3000 --name node-app node-app-image

# # run container (mount: readonly)
# docker run -v $(pwd):/app:ro -v /app/node_modules -d -p 3000:3000 --name node-app node-app-image

# enter docker container
docker exec -it node-app bash

# # remove container
# docker rm -f node-app

#!/bin/sh

docker run -v $PWD/opt:/root/opt -w /root/opt -it --rm -p 7777:8888 docker-python_python3 jupyter-lab --ip 0.0.0.0 --allow-root -b localhost

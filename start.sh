#!/bin/sh

sudo docker build . -t blockchain-code-challenge  || {
    echo 'No docker is running. Install and run docker.';
    exit 1;
    }

docker run -p 3000:3000 blockchain-code-challenge /bin/sh -c 'cd /container/blockchain-JS && npm install && node server.js'

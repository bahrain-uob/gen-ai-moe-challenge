#!/usr/bin/env bash
echo "Deploying project"

source ~/.bashrc
nohup dockerd &
docker version
npm install
npx sst deploy --stage prod
#!/usr/bin/env bash
echo "Jamal You are here!"
echo "Deploying project"

# Install Node.js 18.x (skip if already installed)
nvm install

# Check Node.js version to ensure the correct version is installed
node -v

# Source the bashrc if it exists
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
else
    echo "~/.bashrc not found, skipping"
fi

nohup dockerd &
docker version
npm install
npx sst deploy --stage prod

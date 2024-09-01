#!/bin/bash

# Stop on any error
set -e

# Define variables
REPO_URL="git@github.com:osamabel/PropertyManagement.git"
LOCAL_PATH="PropertyManagement"

# Pull the latest source code
if [ -d "$LOCAL_PATH" ]; then
    # If the directory exists, pull the latest code
    git -C "$LOCAL_PATH" fetch --all
    git -C "$LOCAL_PATH" reset --hard origin/master
    git -C "$LOCAL_PATH" pull

else
    # If not, clone the repository
    git clone "$REPO_URL" "$LOCAL_PATH"
fi


cd "$LOCAL_PATH"

npm install --prefix ./front & npm install --prefix ./back

make start
#!/usr/bin/env bash 
set -xe

GOPATH="/tmp/go"
APP_BUILD_DIR="/var/app/raft-build"  # We will build the app here
APP_STAGING_DIR="$(pwd)" # make staging current directory

# Remove the $APP_BUILD_DIR just in case it was left behind in a failed build.
rm -rf $APP_BUILD_DIR

# Setup the application directory
mkdir -p $APP_BUILD_DIR

# cp all files to $APP_BUILD_DIR
cp -r ./ $APP_BUILD_DIR
cd $APP_BUILD_DIR
cd ./backend/app

# install packages and dependencies
#go mod init github.com/rahulmadduluri/raft-education/backend/app

# build command
GOOS=linux GOARCH=amd64 go build -o application -ldflags="-s -w"
#go build -o application main/main.go

# Modify permissons to make the binary executable.
#chmod +x application

# Move the binary back to staging dir.
mkdir "$APP_STAGING_DIR/backend/app/bin"
mv application "$APP_STAGING_DIR/backend/app/bin"

# Clean up.
rm -rf $APP_BUILD_DIR

cd $APP_STAGING_DIR

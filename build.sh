#!/usr/bin/env bash 
set -xe

GOPATH="/tmp/go"

cd ./backend/app
rm -rf ./bin

# install packages and dependencies
go mod init github.com/rahulmadduluri/raft-education/backend/app

# build command
go build -o application main/main.go

# Modify permissons to make the binary executable.
chmod +x application

# Move the binary back to staging dir.
mkdir bin
mv application bin

# Clean up.
rm -rf $APP_BUILD_DIR

#!/bin/bash
set -e

IMAGE_NAME="pradeepv2006/booking"

echo "Building Docker image..."
docker build -t $IMAGE_NAME .

echo "Pushing Docker image to Docker Hub..."
docker push $IMAGE_NAME

echo "Build and push completed."

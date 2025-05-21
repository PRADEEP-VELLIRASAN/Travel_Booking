#!/bin/bash
set -e

IMAGE_NAME="pradeepv2006/booking"

echo "Pulling latest Docker image..."
docker pull $IMAGE_NAME

echo "Stopping and removing old container (if exists)..."
docker rm -f booking-app || true

echo "Starting new container..."
docker run -d --name booking-app -p 80:80 $IMAGE_NAME

echo "Deployment completed."

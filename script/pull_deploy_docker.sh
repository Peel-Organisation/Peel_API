#!/bin/bash

# Variables
IMAGE_NAME="peelregistry/peel_api:latest"
CONTAINER_NAME="peel_api"
COMPOSE_FILE="docker-compose.yml"
LATEST_IMAGE_ID=$(docker image inspect -f '{{.Id}}' $IMAGE_NAME 2>/dev/null)
IMAGE_WITHOUT_TAG=$(docker images | grep $IMAGE_NAME | awk '{print $3}')

# Check Docker images with the tag "<none>"
if [ -n "$IMAGE_WITHOUT_TAG" ]; then
    for image_id in $IMAGE_WITHOUT_TAG; do
        docker rmi $image_id
    done
    echo "Docker images with the tag '<none>' deleted."
else
    echo "No image with the tag '<none>' found."
fi

# Check if the docker-compose.yml file exists
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "The file $COMPOSE_FILE does not exist."
  exit 1
fi

# Retrieve the new version of the image from the Docker registry
echo "Pulling the latest image from the Docker registry..."
docker pull $IMAGE_NAME
echo "The latest image has been pulled."

# Check if the container is running
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    # Check if the container exists
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        # Remove the stopped container
        docker rm $CONTAINER_NAME
    fi
    # Start a new container with the recovered image
    echo "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
      echo "Error when starting the new container."
      exit 1
    fi
    echo "The new container has been started."
else
    echo "The container is already running."
fi

# Check if the new container is running
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "The new container is not running."

    # Remove the new container
    echo "Deleting the new container..."
    docker rm $CONTAINER_NAME
    echo "The new container has been deleted."

    # Start a new container with the recovered image
    echo "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
      echo "Error when starting the new container."
      exit 1
    fi
    echo "The new container has been started."
else
    echo "The new container is running."
fi

# Check if the new container is up to date
NEW_CONTAINER_IMAGE_ID=$(docker inspect -f '{{.Image}}' $CONTAINER_NAME)
if [ "$NEW_CONTAINER_IMAGE_ID" != "$LATEST_IMAGE_ID" ]; then
  echo "The new container is not up to date."

    # Stop the new container
    echo "Stopping the new container..."
    docker-compose down
    echo "The new container has been stopped."

    # Remove the new container
    echo "Deleting the new container..."
    docker rm $CONTAINER_NAME
    echo "The new container has been deleted."

    # Pull the latest image from the Docker registry
    echo "Pulling the latest image from the Docker registry..."
    docker pull $IMAGE_NAME
    echo "The latest image has been pulled."

    # Start a new container with the recovered image
    echo "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
      echo "Error when starting the new container."
      exit 1
    fi
    echo "The new container has been started."
else
    echo "The new container is up to date."
fi

echo "Image deployment is complete."

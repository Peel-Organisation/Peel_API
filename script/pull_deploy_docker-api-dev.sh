#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher en vert
print_success() {
    echo -e "${GREEN}$1${NC}"
}

# Fonction pour afficher en rouge
print_error() {
    echo -e "${RED}$1${NC}"
}

# Fonction pour afficher en jaune
print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

# Fonction pour afficher un bloc de séparation avec le nom de l'étape
print_step() {
    echo -e "\n################################"
    echo -e "## $1"
    echo -e "################################\n"
}

# Fonction pour afficher un bloc de séparation
print_separator() {
    echo -e "----------------------------------------"
}

# Enregistrement du temps de début
start_time=$(date +%s)

# Variables
IMAGE_NAME="peelregistry/peel_api_dev:latest"
CONTAINER_NAME="peel_api_dev"
COMPOSE_FILE="docker-compose-development.yml"
LATEST_IMAGE_ID=$(docker image inspect -f '{{.Id}}' $IMAGE_NAME 2>/dev/null)
IMAGE_WITHOUT_TAG=$(docker images | grep $IMAGE_NAME | awk '{print $3}')

# Affichage du début du script
print_separator
print_step "Starting the deployment script..."

# Check Docker images with the tag "<none>"
if [ -n "$IMAGE_WITHOUT_TAG" ]; then
    for image_id in $IMAGE_WITHOUT_TAG; do
        docker rmi $image_id
    done
    print_success "Docker images with the tag '<none>' deleted."
else
    print_success "No image with the tag '<none>' found."
fi

# Check if the docker-compose.yml file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    print_error "The file $COMPOSE_FILE does not exist."
    exit 1
fi

# Retrieve the new version of the image from the Docker registry
print_separator
print_step "Pulling the latest image from the Docker registry..."
docker pull $IMAGE_NAME
print_success "The latest image has been pulled."

# Check if the container is running
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    # Check if the container exists
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        # Remove the stopped container
        docker rm $CONTAINER_NAME
    fi
    # Start a new container with the recovered image
    print_separator
    print_step "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
        print_error "Error when starting the new container."
        exit 1
    fi
    print_success "The new container has been started."
else
    print_success "The container is already running."
fi

# Check if the new container is running
if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    print_warning "The new container is not running."

    # Remove the new container
    print_warning "Deleting the new container..."
    docker rm $CONTAINER_NAME
    print_success "The new container has been deleted."

    # Start a new container with the recovered image
    print_separator
    print_step "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
        print_error "Error when starting the new container."
        exit 1
    fi
    print_success "The new container has been started."
else
    print_success "The new container is running."
fi

# Check if the new container is up to date
NEW_CONTAINER_IMAGE_ID=$(docker inspect -f '{{.Image}}' $CONTAINER_NAME)
if [ "$NEW_CONTAINER_IMAGE_ID" != "$LATEST_IMAGE_ID" ]; then
    print_warning "The new container is not up to date."

    # Stop the new container
    print_warning "Stopping the new container..."
    docker-compose down
    print_success "The new container has been stopped."

    # Remove the new container
    print_warning "Deleting the new container..."
    docker rm $CONTAINER_NAME
    print_success "The new container has been deleted."

    # Pull the latest image from the Docker registry
    print_separator
    print_step "Pulling the latest image from the Docker registry..."
    docker pull $IMAGE_NAME
    print_success "The latest image has been pulled."

    # Start a new container with the recovered image
    print_separator
    print_step "Starting a new container..."
    docker-compose -f $COMPOSE_FILE up -d
    if [ $? -ne 0 ]; then
        print_error "Error when starting the new container."
        exit 1
    fi
    print_success "The new container has been started."
else
    print_success "The new container is up to date."
fi

# Affichage du temps d'exécution
end_time=$(date +%s)
execution_time=$((end_time - start_time))
print_separator
print_step "Script execution completed in $execution_time seconds."

# Affichage de la fin du script
print_separator
print_success "Image deployment is complete."
print_separator

# Service Documentation

Use the following commands to build and run the service inside of a running
container. There are commands for both a "production" image/container as well
as for a "development" image/container.

## Network

Each service contained in this example architecture expects to be on the same
network. We can create a virtual network in Docker with the following command:

```bash
# Create a network for services to communicate over.
docker network create skynet
```

## Production

The production image uses the `Dockerfile` file in the root of the service
folder. To build the image, do the following:

```bash
# Build an image for the service.
docker build -t <service>:latest .
```

Replace `<service>` with the actual name of the service you are building an
image for. This will build the image tagging it as `<service>:latest`. You can
see that the image was successfully built by running `docker images`.

You can create a container for that service with:

```bash
# Run docker container on MacOS/Windows/Linux.
docker run --name <service> -d --rm --network skynet <service>:latest
```

## Development

It is often helpful to be able to run a service in a development environment
as you are working on it. For this reason, you will also find a
`Dockerfile.dev` file in the root of the service folder. This file is used to
define a development image for the service. The intention is to create a
volume of the service folder and mount it into the container so that you can
make changes to the code and see them reflected in the container without
having to rebuild the image. To do this, you can use the following command:

```bash
# Build a container using the development Dockerfile.dev.
docker build -f Dockerfile.dev -t <service>:dev .
```

You can then create a container for that service with:

```bash
# Run docker container on MacOS/Linux for development.
docker run --name <service>.dev -it --rm -v "$(pwd)/src:/app/src" --network skynet <service>:dev
```

Windows:

```bash
# Run docker container on Windows for development.
docker run --name <service>.dev -it --rm -v "${PWD}/src:/app/src" --network skynet <service>:dev
```

As this container does not run in detached mode, you will see output in the
terminal in which you ran the above command. To stop the container you can
simply hit `ctrl+c` in the terminal. The `--rm` command will automatically
remove the container from the `ps -a` list of stopped containers.

## Other Useful Commands To Remember

```bash
docker ps                                 # List running containers
docker ps -a                              # List all containers
docker images                             # List all images
docker image prune                        # Prune dangling images
docker run -p <port>:<port> <image name>  # Run a container and map a port
docker rmi <image name>                   # Remove an image
docker exec -it <container name> sh       # Start a shell in a running container
docker prune                              # Remove all stopped containers
docker prune -a                           # Remove all stopped containers and all unused images
```

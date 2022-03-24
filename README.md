# online_code_editor
To run on your pc downlod docker.\
After installing docker on your system build docker image and after successful building image start container by running image.
for eg: \
__To build__: docker build -t `<image-name>` . \
__create container__:  docker run -p `<host-port>:<container-port>` -d --name `<container-name> <image name>` 

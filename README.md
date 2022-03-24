# online_code_editor
To run own your pc downlod docker.\
After installing docker on system build docker image and after successful building image start container.
for eg: .\
__To build__: docker build -t `<image-name>` . \
__create container__:  docker run -p `<host-port>:<container-port>` -d --name `<container-name> <image name>` 

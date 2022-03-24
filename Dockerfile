FROM node:12
RUN apt-get update && apt-get install -y libasound2 libxtst6
RUN wget https://download.bell-sw.com/java/11.0.7+10/bellsoft-jdk11.0.7+10-linux-amd64.deb && \apt install ./bellsoft-jdk11.0.7+10-linux-amd64.deb
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 2000
CMD ["node","index.js"]
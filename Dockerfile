# Start from golang v1.11 base image
FROM golang:1.11

COPY . /src

WORKDIR /src

ENTRYPOINT ["go", "run", "/src/main.go"] 
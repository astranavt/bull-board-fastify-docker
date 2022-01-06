# bull-board-fastify-docker

Docker image for [Bull-Board](https://github.com/felixmosh/bull-board) based on [fastify](https://fastify.io) framework

[Bull-board](https://github.com/felixmosh/bull-board) version 3.8.1

## How to use this image

### Run docker container

```bash
docker run -p 3000:3000 -e REDIS_HOST=host.docker.internal astranavt/bull-board-fastify-docker
```

## Environment variables

### Connect to redis

| Variable       | Description                 | Default value |
| :------------- | :-------------------------- | :------------ |
| REDIS_HOST     | address of the redis server | localhost     |
| REDIS_PORT     | port                        | 6379          |
| REDIS_DB       | databse                     | 0             |
| REDIS_PASSWORD | your password               |               |

### Config bull-board

| Variable    | Description        | Default value |
| :---------- | :----------------- | :------------ |
| BULL_PREFIX | redis key prefix   | bull          |
| PORT        | port               | 3000          |
| APP_ROOT    | path for dashboard | ui            |

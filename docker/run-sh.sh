docker-compose-v1 -f $PWD/docker-compose-$1.yaml -p mockterview-backend-app down
docker-compose-v1 -f $PWD/docker-compose-$1.yaml -p mockterview-backend-app up -d
docker logs -f mockterview-backend-app
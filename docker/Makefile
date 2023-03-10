#!make
TAG                         := $$(git log -1 --pretty=format:%h)
ECR_URI                     := 461386280843.dkr.ecr.ap-northeast-2.amazonaws.com
BASENAME_SEVER              := mockterview-backend
BASENAME_PROXY              := mockterview-nginx
NAME_SERVER                 := ${BASENAME_SEVER}-$$env
NAME_PROXY                  := ${BASENAME_PROXY}-$$env
ECR_ENDPOINT_SERVER         := ${ECR_URI}/${NAME_SERVER}
ECR_ENDPOINT_PROXY          := ${ECR_URI}/${NAME_PROXY}
LOCAL_IMG_COMMIT_SERVER     := ${NAME_SERVER}:${TAG}
LOCAL_IMG_LATEST_SERVER     := ${NAME_SERVER}:latest
LOCAL_IMG_COMMIT_PROXY      := ${NAME_PROXY}:${TAG}
LOCAL_IMG_LATEST_PROXY      := ${NAME_PROXY}:latest
ECR_IMG_COMMIT_SERVER       := ${ECR_ENDPOINT_SERVER}:${TAG}
ECR_IMG_LATEST_SERVER       := ${ECR_ENDPOINT_SERVER}:latest
ECR_IMG_COMMIT_PROXY        := ${ECR_ENDPOINT_PROXY}:${TAG}
ECR_IMG_LATEST_PROXY        := ${ECR_ENDPOINT_PROXY}:latest

build:
	@docker build -f _proxy.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_PROXY} .;
	@docker build -f _server.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_SERVER} ../;
	@docker tag ${LOCAL_IMG_COMMIT_SERVER} ${LOCAL_IMG_LATEST_SERVER};
	@docker tag ${LOCAL_IMG_COMMIT_PROXY} ${LOCAL_IMG_LATEST_PROXY};

	@#if [ $$env != "local" ]; then\
#        docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_COMMIT_SERVER};\
#        docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_LATEST_SERVER};\
#        docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_COMMIT_PROXY};\
#        docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_LATEST_PROXY};\
#    fi

run:
	@echo $$env;
	@sh run.sh $$env

run-sh:
	@echo $$env;
	@sh run-sh.sh $$env

push:
	@aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 461386280843.dkr.ecr.ap-northeast-2.amazonaws.com
	@docker push ${ECR_IMG_COMMIT_SERVER}
	@docker push ${ECR_IMG_LATEST_SERVER}
	@docker push ${ECR_IMG_COMMIT_PROXY}
	@docker push ${ECR_IMG_LATEST_PROXY}

network:
	@sh create-network.sh

kill:
	@echo 'Killing container...'
	@docker-compose -f docker-compose-$$env.yaml -p mockterview-backend-app down

delete:
	# latest ?????? ???????????? ?????? ?????????, ?????? none ??????
	@docker rmi -f $$( docker images --format "{{.ID}} {{.Repository}} {{.Tag}}" | grep none | awk '{print $$1}')
	@docker rmi -f $$( docker images --format "{{.ID}} {{.Repository}} {{.Tag}}" | grep mockterview-nginx | awk '{print ($$2":"$$3)}')
	@docker rmi -f $$( docker images --format "{{.ID}} {{.Repository}} {{.Tag}}" | grep mockterview-backend | awk '{print ($$2":"$$3)}')

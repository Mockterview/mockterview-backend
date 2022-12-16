# mockterview-backend-nestjs

### Installation

```sh
yarn install
```

### Baselines

- TypeScript + Nest.js

### Configurations

1. .github
   1. CODEOWNERS 알맞은 오너로 변경
   2. PULL_REQUEST_TEMPLATE.md 목적에 맞게 변경
2. config
   1. config.\*.yaml: 환경변수
3. [aws](https://www.notion.so/teamsparta/ECS-2cda12f09e7e4e5a87cdbdfa72a996c5#32e0e152a8944e5989d8a4b59c4433c6)
   1. appspec.\*.yaml: CodeDeploy
   2. buildspec.\*.yml: CodeBuild 설정
   3. taskdef.\*.json: ECS 작업정의 설정
4. docker
   1. proxy: nginx 설정파일
   2. \_server.Dockerfile: 포트 변경(EXPOSE)
   3. create-network.sh: 서비스 이름에 맞게 네트워크명 설정
   4. docker-compose-local.yaml: 서비스명, 포트 변경
   5. Makefile: 서비스명 수정
5. Swagger-UI
   1. app.swagger.ts
6. 포트번호 수정
   1. 0000 으로 전체검색 후 일괄 변경

### Other Commands

- 빌드 및 실행

```sh
# 빌드 및 실행 - 로컬
make build env=local run env=local
```

- 불필요한 이미지 삭제

```sh
make delete
```

- ECR 이미지 푸시 ([link](https://www.notion.so/teamsparta/ECR-290c19aaf2c5432a99c9770838fec132))

```sh
make push env=test
make push env=prod
```

### Testing

```sh
# 공통: local, test, prod 중 test 환경 기준으로 실행함.
# pass or fail 만 보고 싶을 때.
yarn test
# 커버리지도 보고싶을 때.
yarn test:cov
# API e2e 테스트.
yarn test:e2e
```

# mockterview-backend-temp

# mockterview-backend-temp

FROM node:17-alpine3.14 as staged
WORKDIR /opt/app

# 패키지 설치
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]

# 빌드
COPY ["tsconfig.build.json", "tsconfig.json", "./"]
COPY ["nest-cli.json", "./"]
COPY ["src/", "./src/"]
COPY ["config/", "./config/"]
RUN ["npm", "run", "build"]

# 환경설정
ARG ENV
COPY ["config/config.${ENV}.yaml", "./dist/config/"]

# 불필요파일 제거
RUN ["/bin/sh", "-c", "find . ! -name dist ! -name config ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

# 배포용 이미지 생성
FROM node:17-alpine3.14 as completed
WORKDIR /opt/app
COPY --from=staged /opt/app ./
ENV ENV=${ENV} NO_COLOR=y
RUN ["ls", "dist"]
RUN ["ls", "dist/config"]
ENTRYPOINT ["node", "dist/src/main"]
EXPOSE 8080/tcp
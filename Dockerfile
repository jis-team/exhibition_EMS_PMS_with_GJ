# 이미지 정의
FROM node:20.14.0-alpine

# 작업 공간
WORKDIR /app

# package.json 파일을 컨테이너로 복사
COPY package.json .

# npm install 명령 실행 (의존성 설치)
RUN npm install

# 프로젝트의 모든 파일을 컨테이너로 복사
COPY . .

# 3000 포트 외부에 노출
EXPOSE 3000

# npm start 명령을 실행하여 프로젝트 시작
CMD ["npm", "start"]
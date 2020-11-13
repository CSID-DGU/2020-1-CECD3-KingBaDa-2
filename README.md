# 오픈소스 기반 "ELK" Tool을 연계 대시보드 사용자 맞춤형 시각화 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Overview
테스트 환경에 설치된 oneM2M 표준을 기반으로한 Mobius플랫폼과 연동되는 시각화 플랫폼이다.
Mobius에 연결된 센서및 디바이스의 정보를 가져와서 도메인과 유저의 요구에 맞는 시각화 자료를 제공한다. 
프로그램 배포의 편의성을 위하여 docker를 사용한다.

Kafka,MariaDB,Elasticsearch,Logstash,Kibana는 컨테이너로 동작합니다.<br>
Kafka - 큐에 쌓인 IoT데이터 메시징<br>
Logstash - input: Kafka  output: Elasticsearch<br>
Elasticsearch -  IoT데이터 저장<br>
Kibana - Elasticsearch 테스트용<br>
MariaDB - 사용자, 센서정보 저장<br>

## Developer

2015112095 박규빈 (팀장)

2015112096 강인솔

2014112105 차민형

2014112037 윤재문

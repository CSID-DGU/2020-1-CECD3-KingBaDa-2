# 오픈소스 기반 "ELK" Tool을 연계 대시보드 사용자 맞춤형 시각화 

## Overview
테스트 환경에 설치된 oneM2M 표준을 기반으로한 Mobius플랫폼과 연동되는 시각화 플랫폼이다.
Mobius에 저장된 IoT데이터를 Kafka를 통해 가져와 Logstash에 넣는다. 수집된 로그는 Elasticsearch에 저장되며 저장된 데이터들중 사용자의 관심사에 맞는 데이터를 가져와 시각화 한다. 
프로그램 배포의 편의성을 위하여 Kafka와 Logstash, Elasticsearch, Kibana, MariaDB는 Docker를 통해 컨테이너 형태로 사용한다.

## Features
![그림3](https://user-images.githubusercontent.com/37682970/100213095-909d0c80-2f51-11eb-9162-d9126981d090.png)

* oneM2M IoT 표준 플랫폼 모비우스를 사용하여 호환성 및 확장성을 보장한다.  
* 대용량 데이터들중 사용자의 관심사에 따라 (전력 데이터, 헬스케어 데이터등) 알맞은 데이터를 사용자가 원하는 형태로 시각화 할 수 있다.
* 센서 및 디바이스 추가를 통해 다양한 종류의 센서및 디바이스를 관리할 수 있다.
* Elasticsearch의 API를 활용하여 대용량 데이터 저장 및 검색의 효율성을 보장한다.
* Kafka를 사용하여 대용량 메시지 처리가 가능하다.

## Tech

* [Mobius] - oneM2M 표준 IoT 플랫폼
* [Kafka] - 오픈소스 메세지 브로커
* [Docker] - 컨테이너 기반 가상화 도구
* [Logstash] - 실시간 파이프라인 데이터 수집 엔진
* [Elasticsearch] - 모든 유형의 데이터를 위한 분산형 오픈소스 검색 및 분석 엔진
* [Kibana] - Elastic stack기반 오픈소스 프론트엔드 어플리케이션, Elasticsearch 데이터 시각화
* [node.js] - 백엔드 개발 소프트웨어 플랫폼
* [Express] - 뻐른 node.js 어플리케이션 앱 프레임워크
* [D3] - 데이터 시각화 프레임워크
* [Vue.js] - 사용자 인터페이스를 위한 프로그레시브 프레임워크

### Structure

![그림1](https://user-images.githubusercontent.com/37682970/100212110-4bc4a600-2f50-11eb-8b6b-712634fe1d7a.png)

![그림2](https://user-images.githubusercontent.com/37682970/100212335-8af2f700-2f50-11eb-95ec-aaee8279d05d.png)

## Project front-end setup
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
### Project back-end setup
```
npm start
```
### Docker setup
```
Docker-compose up -d
```

## Developer

2015112095 박규빈 (팀장) [https://github.com/kb829][GITa] <br>
2014112037 윤재문 [https://github.com/dss1111][GITb] <br>
2014112105 차민형 [https://github.com/moongchi95][GITc] <br>
2015112096 강인솔 [https://github.com/insolk][GITd] <br>


   [mobius]: <http://developers.iotocean.org/archives/module/mobius>
   [kafka]: <https://kafka.apache.org/>
   [Docker]: <https://www.docker.com/>
   [Logstash]: <https://www.elastic.co/kr/logstash>
   [Elasticsearch]: <https://www.elastic.co/kr/>
   [Kibana]: <https://www.elastic.co/kr/kibana>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [D3]: <https://d3js.org/>
   [Vue.js]: <https://vuejs.org/>

   [GITa]: <https://github.com/kb829>
   [GITb]: <https://github.com/dss1111>
   [GITc]: <https://github.com/moongchi95>
   [GITd]: <https://github.com/insolk>

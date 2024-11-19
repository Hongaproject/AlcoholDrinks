# 3시간 코딩 대한민국 모든 주류
>대한민국 모든 주류는 대한민국의 술을 소개하는 웹사이트입니다. 제작 계기는 자주 먹는 술에 대한 궁금증이 생기기 시작했고, 대한민국에 술 종류는 몇 개나 있을까, 그리고 술을 먹으면서 술의 역사나 지식을 알고 있으면 이야기 거리가 생기고 더 재밌게 먹을 수 있지 않을까라는 생각에서 시작한 프로젝트입니다.
처음에는 궁금증과 호기심으로 제작하게 되었는데, 제작을 하면서 이 프로젝트를 크게 만들어서 홍보용으로 사용하고 싶다고 생각이 들었습니다. 현재 개인적인 일로 인하여 코딩을 할 시간이 많지 않았는데 하루 3시간 씩 코딩을 해서 프로젝트를 만들어 보자 해서 3시간 코딩 대한민국 모든 주류 사이트를 제작했습니다.

## 화면 구성
<a href="https://velog.io/@hongga/하루-3시간-코딩-주류-사이트-제작하기-최종본" target="_blank"> 최종본 </a> - 소개하는 페이지다보니 사진이 많아서 자세한 내용은 블로그에서 확인해주세요.

## 프로젝트 상세
서비스화면
![screencapture-localhost-3000-2024-08-05-16_33_48](https://github.com/user-attachments/assets/028dbb51-6236-4d34-9215-ae5144049f97)

<img width="1822" alt="스크린샷 2024-08-05 오후 4 37 39" src="https://github.com/user-attachments/assets/746a9f71-512f-49e1-8674-03db7932709c">

![screencapture-localhost-3000-brand-detail-soju-1-2024-08-05-16_42_22](https://github.com/user-attachments/assets/05ed4bf6-667d-40d4-a0fb-402e9c195585)

<img width="911" alt="스크린샷 2024-08-05 오후 4 47 15" src="https://github.com/user-attachments/assets/e813b74e-b900-4d4d-8457-4b767680e621">

<img width="911" alt="스크린샷 2024-08-05 오후 4 51 21" src="https://github.com/user-attachments/assets/99ed9ed2-e7fc-46cd-aef7-73f03b68b6d1">

<img width="911" alt="스크린샷 2024-08-05 오후 4 51 09" src="https://github.com/user-attachments/assets/382f3c9b-187a-45fb-b5d3-b14a824c68a5">

### 일정
- **시작일**: 2024-06-24
- **종료일**: 2024-08-05

### 기술 스택
| Front-end | Back-end |
| --- | --- |
| React | Firebase |
| Styled-Components | Vercel |
| React-Icons |  |
| Email JS |  |
| Context API | |

### 기능 구현
- **검색 기능**: 데이터베이스에 있는 정보를 검색하면 관련 상품이 나타나며 상품 클릭 시 해당 상품 상세 페이지로 이동이 가능합니다.
- **메일 보내기**: 사이드 버튼에 있는 비행기 모양 아이콘을 클릭하면 이메일 전송 페이지가 나타납니다. Email JS를 사용하여 사용자가 불편한 점이나 개선 사항을 작성하고 전송할 수 있습니다.
- **회원가입**: Firebase를 통해 이메일, 비밀번호, 닉네임을 설정해 계정을 생성할 수 있습니다. 이메일과 닉네임의 중복 체크 기능도 지원합니다.
- **로그인**: Firebase를 사용하여 이메일과 비밀번호로 로그인할 수 있으며, Google 및 GitHub 계정을 활용한 소셜 로그인도 지원합니다.
- **상품 페이지**: 직접 제작한 데이터를 사용하여 초기 화면에 8개의 상품을 보여주며, IntersectionObserver를 사용하여 스크롤 시 추가 상품을 자동으로 불러오는 무한 스크롤 기능을 구현했습니다.
- **상품 저장**: Context API를 사용하여 상태 관리를 진행했으며, 상품 페이지의 하트 아이콘을 클릭하면 상품을 저장하거나 삭제할 수 있고 저장 시 옆에 있는 숫자가 업데이트 되어 몇 명이 해당 상품을 저장했는지 확인할 수 있습니다. 저장된 상품은 프로필 화면에서 확인할 수 있습니다.
- **상세 페이지**: 선택한 상품의 상세 정보를 확일할 수 있으며, 사용자는 상품에 대한 리뷰를 작성, 수정, 삭제할 수 있습니다.
- **상품평 관리**: Firestore를 사용하여 상품평을 저장하고 관리합니다. 사용자는 자신의 상품평을 수정하거나 삭제할 수 있습니다.

### 추후 일정
- **사용자 피드백 수집 및 반영**: 사이트 사용자들로부터 피드백을 수집하고, 이를 바탕으로 사용성 개선 및 추가 기능을 구현할 계획입니다.
- [피드백 사항](https://precious-earwig-cd5.notion.site/836f6b25faa84466947939e0bbafa37e?pvs=4) - 클릭 시 작업 중인 내용을 확인하실 수 있습니다.

### 문제 해결
- **Firebase 관련 오류**: Firebase 설정 중 발생한 오류와 Firestore 사용 과정에서의 문제를 해결했습니다. 특히 Firestore의 데이터 저장 및 읽기에서 발생한 문제를 해결하며, 규칙 및 설정에 대해 배웠습니다.
- **상품 저장 기능 문제**: 카테고리가 다른 상품이지만 위치가 같으면 동일하게 업데이트되는 현상을 수정했습니다. 이를 통해 카테고리와 위치를 별도로 관리하여 충돌을 방지했습니다.
- **검색 기능 오류**: 검색 기능 구현 중, 서로 다른 상품 이름이 검색창에 같은 결과로 나타나는 현상을 해결했습니다. 검색어와 상품명을 정확히 매칭하도록 개선했습니다.
- **로그아웃 상태 오류**: 로그아웃 상태에서 상품 클릭 시 오류가 발생하는 문제를 수정했습니다. 사용자 인증 상태를 체크하여 비회원 접근을 제한했습니다.
- **컴포넌트 통합 문제**: 초기에는 5개의 JSON 파일에 대해 각각의 컴포넌트를 작성했으나, 공통 컴포넌트로 통합하면서 발생한 오류를 수정했습니다. 통합 과정에서 데이터 불러오기와 상태 관리 문제를 해결했습니다.

### 배웠던 점
- **React와 Firebase 연동**: Firebase와 React를 연동하는 방법을 학습했습니다. 이를 통해 인증, 데이터베이스, 스토리지 기능을 효과적으로 활용할 수 있었습니다.
- **Firestore와 Store 차이**: Firestore와 일반 스토리지의 차이를 이해하고, 각각의 장단점을 학습했습니다.
- **Firestore 활용**: Firestore를 사용하여 데이터 저장 및 상품평 CRUD 구현 방법을 익혔습니다.
- **Context API**: React Context API를 사용하여 애플리케이션 상태 관리를 효과적으로 수행했습니다.
- **무한 스크롤 및 검색 기능**: 무한 스크롤과 검색 기능 구현 방법을 배우고, 사용자 경험을 개선하는 방법을 실습했습니다.
- **Email JS**: Email JS를 사용하여 메일 발송 기능을 구현했습니다. 외부 API를 활용하여 이메일 전송을 자동화하는 방법을 익혔습니다.
- **디자인 툴 사용**: CSS 라이브러리 없이 직접 스타일링을 하고, Figma를 사용하여 디자인을 구현해보았습니다. 디자인과 개발의 연계를 경험하며, 사용자 인터페이스를 직접 설계하는 데 대한 자신감을 얻었습니다.

### 아쉬웠던 점
- **검색 기능 사용 시 상세 페이지 이동 기능 미지원**: 검색 기능에서 상세 페이지로의 이동 기능이 시간 부족으로 인해 구현되지 못했습니다. 향후 보강이 필요합니다.
- **반응형 페이지 미지원** : 프로젝트 제작 시 시간 부족으로 인해 반응형 디자인을 구현하지 못했습니다. 향후 다양한 화면 크기에서 최적의 사용자 경험을 제공할 수 있도록 향후 보강을 하겠습니다.
- **시간 관리**: 현재 다른 일과 병행하면서 하루 최대 3시간만 투자할 수 있어 프로젝트 진행에 제약이 있었습니다. 충분한 시간을 확보하지 못한 것이 아쉬웠습니다.
- **문제 해결의 어려움**: 정해진 시간 내에 오류를 해결하는 과정에서 어려움을 겪었습니다. 문제 해결을 위해 추가 학습이 필요한 상황이었고, 더 많은 학습 시간을 확보할 필요성을 느꼈습니다.

### 업데이트 내용 11월 19일 (화)
- **웹 접근성** : role 및 aria속성을 추가하여 접근성을 높였습니다.
- **반응형 추가** : 다양한 디바이스에서 최정의 사용자 경험을 제공하기 위해 반응형 페이지를 구현했습니다.
- **대체 이미지 추가** : 이미지 로드 실패 시 대체 이미지를 추가했습니다.
- **검색 기능 상세 페이지 이동 기능 추가** : 검색된 상품을 클릭 시 관련 상품의 상세 페이지로 이동할 수 있는 기능을 추가했습니다.
- **회원가입 시 이메일, 닉네임 중복체크 기능 추가** : 이메일과 닉네임 중복 체크 기능을 구현하여 중복된 정보를 입력하지 못하도록 방지했습니다.
- **로그인 시 이메일, 비밀번호 에러메세지 추가** : 이메일이나 비밀번호 오류 시 사용자에게 적절한 에러 메시지를 제공하도록 개선했습니다.

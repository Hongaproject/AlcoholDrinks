# 3시간 코딩 대한민국 모든 주류
>대한민국 모든 주류는 대한민국의 술을 소개하는 웹사이트입니다. 제작 계기는 자주 먹는 술에 대한 궁금증이 생기기 시작했고, 대한민국에 술 종류는 몇 개나 있을까, 그리고 술을 먹으면서 술의 역사나 지식을 알고 있으면 이야기 거리가 생기고 더 재밌게 먹을 수 있지 않을까라는 생각에서 시작한 프로젝트입니다.
처음에는 궁금증과 호기심으로 제작하게 되었는데, 제작을 하면서 이 프로젝트를 크게 만들어서 홍보용으로 사용하고 싶다고 생각이 들었습니다. 현재 개인적인 일로 인하여 코딩을 할 시간이 많지 않았는데 하루 3시간 씩 코딩을 해서 프로젝트를 만들어 보자 해서 3시간 코딩 대한민국 모든 주류 사이트를 제작했습니다.

## 화면 구성
소개하는 페이지다보니 사진이 많아서 자세한 내용은 블로그에서 확인해주세요.

## 프로젝트 상세
서비스화면
![screencapture-localhost-3000-2024-08-05-16_33_48](https://github.com/user-attachments/assets/028dbb51-6236-4d34-9215-ae5144049f97)

### 일정
- **시작일**: 2024-06-24
- **종료일**: 2024-08-05

### 기술 스택
| Front-end | Back-end |
| --- | --- |
| React | Firebase |
| Styled-Components | Email JS |
| React-Icons |  |
| Context API |  |

### 기능 구현
- **검색 기능**: 데이터베이스에 있는 정보를 검색하면 관련 상품이 나타납니다. (현재 상품 클릭 시 상세 페이지로 이동하는 기능은 미완성입니다.)
- **메일 보내기**: 사이드 버튼의 비행기 모양 아이콘을 클릭하면 이메일 전송 화면이 나타납니다. Email JS를 사용하여 사용자가 작성한 내용을 이메일로 전송할 수 있습니다.
- **회원가입**: Firebase를 통해 이메일과 비밀번호로 계정을 생성할 수 있습니다.
- **로그인**: Firebase를 사용하여 이메일과 비밀번호로 로그인할 수 있으며, 구글과 깃허브 계정을 통한 소셜 로그인도 지원합니다.
- **상품 페이지**: 직접 만든 데이터를 사용하여 초기 화면에 8개의 상품을 보여주며, IntersectionObserver를 사용하여 스크롤 시 추가 상품을 불러오는 무한 스크롤 기능을 구현했습니다.
- **상품 저장**: Context API를 사용하여 상태 관리를 진행했으며, 상품 페이지에 있는 하트 아이콘을 클릭하면 상품을 저장하거나 삭제할 수 있고 저장 시 옆에 있는 숫자가 업데이트 되어 몇 명이 저장했는지 알 수 있습니다. 저장된 상품은 프로필 화면에서 확인할 수 있습니다.
- **상세 페이지**: 선택한 상품의 상세 정보를 표시하며, 사용자는 상품에 대한 리뷰를 작성, 수정 및 삭제할 수 있습니다.
- **상품평 관리**: Firestore를 사용하여 상품평을 저장하고 관리합니다. 사용자는 작성한 리뷰를 수정하거나 삭제할 수 있습니다.

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
- **디자인 툴 사용**: 처음으로 CSS 라이브러리 없이 직접 스타일링을 하고, Figma를 사용하여 디자인을 구현해보았습니다. 디자인과 개발의 연계를 경험하며, 사용자 인터페이스를 직접 설계하는 데 대한 자신감을 얻었습니다.

### 아쉬웠던 점
- **상세 페이지 이동 기능 미완성**: 검색 기능에서 상세 페이지로의 이동 기능이 시간 부족으로 인해 구현되지 못했습니다. 향후 보강이 필요합니다.
- **시간 관리**: 현재 다른 일과 병행하면서 하루 최대 3시간만 투자할 수 있어 프로젝트 진행에 제약이 있었습니다. 충분한 시간을 확보하지 못한 것이 아쉬웠습니다.
- **문제 해결의 어려움**: 정해진 시간 내에 오류를 해결하는 과정에서 어려움을 겪었습니다. 문제 해결을 위해 추가 학습이 필요한 상황이었고, 더 많은 학습 시간을 확보할 필요성을 느꼈습니다.

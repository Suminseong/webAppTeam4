새로 만들게 될 웹 페이지
=========================

>## 작성규칙
---------

1. 모든 유동적 요소 포지션은 flex, "fixed+transform"에 기반합니다. fix, sticky 사용이 필요하다면 상관 없지만, 중앙 정렬에 absolute라든지, inline-block을 쓴다든지 하는 불상사가 있다면 슬픕니다.
2. 모든 이미지는 alt 속성을 필히 입력합니다.
3. 누군가 만들어둔 코드의 클래스명, 변수명, 함수제어 규칙 등을 임의 수정 및 편집하지마세요.
4. 수정 제안은 주석처리한 코드로 제안하면 좋겠습니다.
5. 함수, 기능부 제작시 남이 알아볼 수 있게 주석처리를 필히 합시다.

***

> ### Class Name 규칙

+ 모든 클래스 명칭의 띄어쓰기는 대쉬(-)를 사용합니다.
+ 숫자와 문자 사이는 띄도록 합니다.
+ 대문자, 언더바는 쓰지 않습니다.
  
예시 보고 가세요

    item-container, logo-text, section-container-mobile, section-1-button-2
    
이미지는 img, 텍스트는 text와 같이 남이 봐도 아 이거 그거구나~ 할 수 있게ㅇㅇ

> ### 변수명 표기법

+ 모든 변수 명칭은 띄어쓰기, 대쉬, 언더바를 쓰지 않습니다.
+ 카멜 명명법으로 변수명을 짓도록 합시다.
+ 한 단어로 끝나면 그냥 한 단어 쓰면 됩니다.

카멜을 모른다면? 예시 보고 가십셔

    navBtn, logoImg, contentViewer, iReallyLikeMoney, weight, xAxis
    
얘 또한 서로 알아보기 쉽게 이름 짓도록 합시다. 여의치 않으면 각주처리로 설명이라도ㅇㅇ

***

## 업로드 및 프로젝트 관리

1. 풀 리퀘스트(PR): 원본에서 바로바로 수정하다가 서로 만진 내용 중복되는 불상사가 생기면 최악의 경우 모든 코드를 갈아엎을 수 있읍니다.
   그러니, 반드시 큰 규모의 수정 요청이 있을 경우에는 request 폴더에 "수정자성명_수정할파일명_날짜"형태로 파일 명 적어서 commit 해주세요. 리뷰어가 검토후 적용합니다.

2. 작은 규모의 수정이나 오탈자 처리 정도는 그냥 그 파일에 각주로 달아버려도 무방합.

3. 리뷰어: 우리 다들 js, j쿼리 기본 이상은 하니까 리뷰는 자유롭게, 상대 코드에 각주 달아서 의문점 제기해도 좋음.

4. 리뷰 피드백 반영: 리뷰어의 피드백을 반영하고 필요한 경우 추가적인 커밋을 통해 수정.
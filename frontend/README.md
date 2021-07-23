# Frontend README

프론트엔드

## 사용 기술

React, React-router-DOM, Redux



## 폴더구조

- public - images : 이미지 저장소
- src
  - api : 백엔드 통신
  - components : 라우터 컴포넌트의 내부 컴포넌트
    - css : css 파일 관리
    - auth : 로그인, 회원가입 등
    - game : 경기 예약, 기록, 관리 등
    - header : 헤더
  - store : 전역 변수 관리 (createContext)
  - views : 라우터 컴포넌트
    - auth : 유저 관련 페이지
    - game : 경기 관련 페이지
    - error : 에러 페이지



## URL 주소 정리

| path                          | 페이지           | 비고                                                        |
| ----------------------------- | ---------------- | ----------------------------------------------------------- |
| /                             | 메인             | 유저, 관리자 로그인, 첫 로그인 시                           |
| /accounts/login               | 로그인           |                                                             |
| /accounts/find_password       | 비밀번호 찾기    |                                                             |
| /accounts/register            | 회원가입         |                                                             |
| /accounts/profile/:user_email | 프로필           | 내 프로필, 유저 프로필                                      |
| /accounts/change_password     | 비밀번호 변경    |                                                             |
| /accounts/gym/register        | 체육관 등록      |                                                             |
| /accounts/gym/:gym_id/update  | 체육관 수정      |                                                             |
| /match/:match_id              | 픽업 게임 상세   | 게임 시작하면 체육관 관리자 및 참가자만 기록 관련 접근 가능 |
| /match/:match_id/pay          | 입금 요청        |                                                             |
| /match/mygames                | 내가 예약한 경기 |                                                             |
| /match/register               | 경기 등록        | 관리자 전용                                                 |
| /match/:match_id/update       | 경기 수정        | 관리자 전용                                                 |



## 개발 특이사항

### 2021-07-23

#### RegisterGeneral/Business

[담당자]

: 박정웅

[특이사항]

: Components에 추가한 validation 파일로 유효성 검증 (코드가 길어지고 읽기 힘들어지는 것 방지 용도)

[참고자료]

: https://www.daleseo.com/react-forms-with-hooks/

https://skm1104.tistory.com/4

https://webdir.tistory.com/435

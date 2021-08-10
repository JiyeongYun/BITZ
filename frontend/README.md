# Frontend
권오우, 박정웅, 장현웅

## Frontend 개발 방향성
<u>서비스가 기존방식 대비 전방위에 걸쳐 비교우위를 가져야 함</u>

- **보다 편리한 예약 시스템**

  => `최소한의 과정으로 예약에 접근 / 게임 참여가 가능`

- **보다 보기 좋은 디자인**

  => `CSS 표준을 이용한 디자인 통일`

- **기존 시스템에 없던 사용자 친화적인 데이터 제공**

  => `선호 지역 경기 우선 제공, 지역/날짜 필터링, 일방적인 게임을 막기 위한 실력 별 팀 매칭 알고리즘`

## 사용 기술
React JS

## 폴더 구조
- public - images : 이미지 저장소
- src
  - api : 백엔드 통신
  - components : 라우터 컴포넌트의 내부 컴포넌트
    - css : css 파일 관리
    - auth : 로그인, 회원가입 등
    - game : 경기 예약, 기록, 관리 등
    - header : 헤더
  - store : 전역 변수 관리 (Vanilla React)
  - views : 라우터 컴포넌트
    - auth : 유저 관련 페이지
    - game : 경기 관련 페이지
    - error : 에러 페이지

## Frontend URI
| path                                 | 페이지           | 비고                                                         |
| ------------------------------------ | ---------------- | ------------------------------------------------------------ |
| /                                    | 메인             | 유저, 관리자 로그인, 첫 로그인 시 첫 로그인 전용 화면으로 이동 |
| /accounts/login                      | 로그인           |                                                              |
| /accounts/find-password              | 비밀번호 찾기    |                                                              |
| /accounts/register                   | 회원가입         |                                                              |
| /accounts/profile/:user-email        | 프로필           | 내 프로필, 유저 프로필                                       |
| /accounts/change-password            | 비밀번호 변경    |                                                              |
| /accounts/gym/register               | 체육관 등록      |                                                              |
| /accounts/gym/:gym-id/update         | 체육관 수정      |                                                              |
| /accounts/profile/:user-email/update | 회원 정보 수정   |                                                              |
| /match/:match-id                     | 픽업 게임 상세   | 게임 시작하면 체육관 관리자 및 참가자만 기록 관련 접근 가능  |
| /match/:match-id/pay                 | 입금 요청        |                                                              |
| /match/mygames                       | 내가 예약한 경기 |                                                              |
| /match/register                      | 경기 등록        | 관리자 전용                                                  |
| /match/:match-id/update              | 경기 수정        | 관리자 전용                                                  |

## Backend 통신 API (RESTful API)
| Category            | Summary                              | Method | RequestMapping (package에 해당) | URI                            | Request Header | Params         | Request Body                                                 | Success Code | Response Header | ResponseBody                                                 |
| ------------------- | ------------------------------------ | ------ | ------------------------------- | ------------------------------ | -------------- | -------------- | ------------------------------------------------------------ | ------------ | --------------- | ------------------------------------------------------------ |
| **일반 사용자**     | 회원가입                             | POST   | `/account/user`                 | `/userauth`                    | X              | X              | email : String, password : String, name : String, nickname : String phone : String      birth : String | 200          | X               | X                                                            |
|                     | 이메일 중복체크                      | POST   | 위와 동일                       | `/userauth/email`              | X              | X              | email : String                                               | 200          | X               | X                                                            |
|                     | 닉네임 중복체크                      | POST   | 위와 동일                       | `/userauth/nickname`           | X              | X              | nickname : String                                            | 200          | X               | X                                                            |
|                     | 로그인                               | POST   | 위와 동일                       | `/userauth/login`              | X              | X              | email : String password : String                             | 200          | X               | accesstoken                                                  |
|                     | 최초로그인 확인                      | POST   | 위와 동일                       | `/loginlog`                    | accesstoken    | X              | email : String                                               | 200          | accesstoken     | X                                                            |
|                     | (최초로그인 시) 마이페이지 정보 저장 | POST   | 위와 동일                       | `/userprofile`                 | accesstoken    | X              | email : String <br />height : Int guard : Boolean forward : Boolean center : Boolean sido1 : String gungu1 : String sido2 : String gungu2 : String sido 3 : String gungu3 : String | 200          | accesstoken     | X                                                            |
|                     | 마이페이지 정보 조회                 | GET    | 위와 동일                       | `/userprofile`                 | accesstoken    | email : String | X                                                            | 200          | accesstoken     | name: String email : String nickname : String birth : String height : Int guard : bool forward : bool center : bool phone : String sido1 : String gugun1: String sido2 : String gugun2 : String sido3 : String gugun3 : String (UserAuth, UserProfile,  FavoriteLocation) |
|                     | 마이페이지 정보 수정                 | PUT    | 위와 동일                       | `/userprofile`                 | accesstoken    | X              | email : String nickname : String birth : String height : int guard : boolean forward : boolean center : boolean sido1 : String gungu1 : String sido2 : String gungu2 : String sido 3 : String gungu3 : String (UserAuth, UserProfile,  FavoriteLocation) | 200          | accesstoken     | X                                                            |
|                     | 비밀번호 변경                        | PUT    | 위와 동일                       | `/userauth/password/change`    | accesstoken    | X              | email : String password : String newPassword : String        | 200          | accesstoken     | X                                                            |
|                     | 비밀번호 찾기                        | PUT    | 위와 동일                       | `/userauth/password/reset`     | accesstoken    | X              | email : String                                               | 200          | accesstoken     | X                                                            |
|                     | 회원탈퇴                             | DELETE | 위와 동일                       | `/userauth`                    | accesstoken    | X              | email : String                                               | 200          | X               | X                                                            |
| **비즈니스 사용자** | 회원가입                             | POST   | `account/business`              | `/businessauth`                | X              | X              | email : String name : String password : String phone : String birth : String bank : String account : String business_registration : byte[] | 200          | X               | X                                                            |
|                     | 이메일 중복체크                      | POST   | 위와 동일                       | `/businessauth/email`          | X              | X              | email : String                                               | 200          | X               | X                                                            |
|                     | 로그인                               | POST   | 위와 동일                       | `/businessauth/login`          | X              | X              | email: String password : String                              | 200          | X               | accesstoken                                                  |
|                     | 최초 로그인 확인                     | POST   | 위와 동일                       | `/loginlog`                    | accesstoken    | X              | email : String                                               | 200          | accesstoken     | isLogin : Bool                                               |
|                     | (최초로그인 시) 마이페이지 정보 저장 | POST   | 위와 동일                       | `/businessprofile`             | accesstoken    | X              | email : String name : String address : String intro : String notice : 주의 사항 court_width : Int court_length : Int is_parking : Bool is_shower : Bool is_airconditional : Bool is_water : Bool is_basketball : Bool is_scoreboard : Bool | 200          | accesstoken     | X                                                            |
|                     | 마이 페이지 조회                     | GET    | 위와 동일                       | `/businessprofile`             | accesstoken    | email : String | X                                                            | 200          | accesstoken     | name : String email : String bank : String account : String gym { name : String address : String court_length : Int court_width : Int } |
|                     | 비밀번호 변경                        | PUT    | 위와 동일                       | `/businessauth/password`       | accesstoken    | X              | X                                                            | 200          | accesstoken     | X                                                            |
|                     | 비밀번호 찾기                        | PUT    | 위와 동일                       | `/businessauth/password/reset` | accesstoken    | X              | X                                                            | 200          | accesstoken     | X                                                            |
|                     | 회원탈퇴                             | DELETE | 위와 동일                       | `/businessauth`                | accesstoken    | X              | X                                                            | 200          | X               | X                                                            |
| **게임 관련**       | 게임 등록                            | POST   | `/game`                         | `/game`                        | accesstoken    | X              | date : date(ex. "2021-08-05") endTime : Time gymName : String maxPeople : Int minPeople : Int participationFee : Int startTime : Time | 200          | accesstoken     | X                                                            |
|                     | 게임 정보 조회 (상세페이지)          | GET    | 위와 동일                       | `/game`                        | accesstoken    | game pk : long | email : String                                               | 200          | accesstoken     | game { date : date start_time : time end_time : time min_people : Int max_people : Int participation_fee : Int }  gym{ address : String name : String intro : String notice : String court_width : Int court_length : Int is_parking : Bool is_shower : Bool is_airconditional : Bool is_water : Bool is_basketball : Bool is_scoreboard : Bool }  gameparticipant { 리스트 형태로 List<UserAuth> 이렇게 갈거임 }  businessprofile { name : String phone : String bank : String account : String } |
|                     | 게임 정보 수정                       | PUT    | 위와 동일                       | `/game`                        | accesstoken    | X              | game pk : Int date : String  endTime : Time  gymName : String  maxPeople : Int  minPeople : Int  participationFee : Int  startTime : Time | 200          | accesstoken     | X                                                            |
|                     | 게임 정보 삭제                       | DELETE | 위와 동일                       | `/game`                        | accesstoken    | X              | game pk : long                                               | 200          | accesstoken     | X                                                            |
|                     | (메인페이지) 게임 리스트 조회        | GET    | 위와 동일                       | `/game/list`                   | accesstoken    | X              | date : Time                                                  | 200          | accesstoken     | date : date start_time : time end_time : time min_people : Int max_people : Int participation_fee : Int  gym{ address : String name : String court_width : Int court_length : Int is_parking : Bool is_shower : Bool is_airconditional : Bool is_water : Bool is_basketball : Bool is_scoreboard : Bool } |
|                     | 예약한 게임 리스트 조회              | GET    | 위와 동일                       | `/game/mygame`                 | accesstoken    | email : String | X                                                            | 200          | accesstoken     | date : date start_time : time end_time : time min_people : Int max_people : Int participation_fee : Int  gym{ address : String name : String court_width : Int court_length : Int is_parking : Bool is_shower : Bool is_airconditional : Bool is_water : Bool is_basketball : Bool is_scoreboard : Bool } |
|                     | 게임 점수 조회                       | GET    | 위와 동일                       | `/gamerecord`                  | accesstoken    | game pk : long | X                                                            | 200          | accesstoken     | gamerecord                                                   |
|                     | 게임 점수 기록                       | POST   | 위와 동일                       | `/gamerecord`                  | accesstoken    | X              | team : int quarter : int score : int email : String game_id : long | 200          | accesstoken     | gamerecord                                                   |
|                     | 경기 리뷰 저장                       | POST   | 위와 동일                       | `/review`                      | accesstoken    | X              | email: String game_id : long mvp : String manner : String [] gym { kindness : int ficility : int } | 200          | accesstoken     | gymreview { }  manner { }                                    |

## 개발 특이사항
| Date | Feature | 담당자 | 특이사항 | 참고 자료 |
| ---- | ------- | ------- | -------- | ---------- |
| 2021.07.23 | RegisterGeneral/Business | 박정웅 | Components에 추가한 validation 파일로 유효성 검증 (코드가 길어지고 읽기 힘들어지는 것 방지 용도) | https://www.daleseo.com/react-forms-with-hooks/ <br> https://skm1104.tistory.com/4 <br> https://webdir.tistory.com/435 |
| 2021.07.27 | Frontend 전체 | 박정웅 | 동일 Form이지만 각 페이지가 다른 CSS를 가지고 있음 => 통일 필요 |  | 
| 2021.07.28 | Frontend 전체 | 박정웅 | Vanilla React의 Context API, Hook을 사용해 Redux 대체 작업 완료 / Store를 통한 전역 상태 관리 시작 |  |
| 2021.07.29 | RegisterBusiness | 장현웅 | File 업로드 기능 구현 / DB 저장 구현 |  |
| 2021.08.02 | Frontend 전체 | 권오우 | CSS 통일을 위한 표준 작성 |  |
| 2021.08.05 | 배포 | 이소은 | 배포 |  |



------

**Version** : 0.2

**Date** : 21.08.06 (금)

**Author** : 이소은

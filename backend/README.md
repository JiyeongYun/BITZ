# Backend
윤지영, 이소은, 장현웅

## 사용 기술
Spring boot, MySQL

## 폴더 구조
- config : Config 파일이 위치하는 곳
- controller : 사용자 요청을 주고받는 Controller 파일이 위치하는 곳
     - account (user, business) :  유저 관련
     - game : 게임 관련
     - gym : 체육관 관련
- jwt : JsonWebToken 관련 파일 위치
- model : 서비스에 필요한 각종 객체들
    - entity : DB에 존재하는 테이블과 맵핑되는 객체
    - network : 프론트엔드에서 백엔드로 요청하고 응답할 때 필요한 객체
- service : Controller와 Repository 사이에서 로직을 전담
     - account (user, business) :  유저 관련
     - game : 게임 관련
     - gym : 체육관 관련
- repository : DB를 사용하여 데이터의 조회 및 조작 기능 전담
     - account (user, business) :  유저 관련
     - game : 게임 관련
     - gym : 체육관 관련


## Frontend 통신 URI (RESTful API)

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
| Date | Feature | 담당자 | 특이사항 | 기타 |
| ---- | ------- | ------- | -------- | ---------- |
| 2021.07.20 | DB | 장현웅 | 테이블 구성 |  |
| | 와이어프레임 | 윤지영 | 와이어프레임 작성 |  | 
|  | 피그마 | 윤지영 & 박정웅 | 피그마 작성 |  |
|  | 스토리보드 | 이소은 | 스토리보드 작성 |  |
| 2021.07.27 | UserAuth | 이소은 | 일반 사용자 비밀번호 찾기 |  |
|  | UserAuth | 이소은 | 일반 사용자 로그인 |  |
|  | UserAuth | 이소은 | 일반 사용자 비밀번호 변경 |  |
|  | BusinessAuth | 윤지영 | 사업자 사용자 로그인 |  |
|  | BusinessAuth | 윤지영 | 사업자 사용자 비밀번호 변경 |  |
| 2021.07.28 | Swagger | 이소은 | Swagger ui 작성 |  |
|  | UserAuth | 이소은 | 일반 사용자 회원가입 |  |
|  | BusinessAuth | 윤지영 | 사업자 사용자 회원가입 |  |
| 2021.07.29 | 아키텍처 | 윤지영 | 아키텍처 작성 |  |
|  | PPT | 이소은 | SUB2 발표용 PPT 작성 |  |
|  | 개발문서 | 이소은 | SUB2 개발 문서 작성 |  |
| 2021.08.02 | DB | 윤지영 | FK테이블 관련 CASCADE 수정 |  |
|  | DB | 이소은 | EC2에 DB 배포 |  |
| 2021.08.05 | JWT | 윤지영 & 장현웅 | JWT 구현 |  |
|  | Gym | 장현웅 | 체육관 CRUD 기능 |  |
|  | Game | 장현웅 | 게임(경기) CRUD 기능 |  |
|  | 배포 | 이소은 | Spring 내장 톰캣을 통한 BackeEnd 배포(.jar) | ver_0.1 |
|  | 배포 | 이소은 | Nginx를 통한 FrontEnd 배포(build) | ver_0.1 |
| 2021.08.06 | BusinessAuth | 윤지영 | 일반 사용자 프로필 출력 |
|  | BusinessAuth | 윤지영 | 사업자 사용자 프로필 출력 |  |
|  | 배포 | 이소은 | Spring 내장 톰캣을 통한 BackeEnd 배포(.jar) | ver_0.2 |
|  | 배포 | 이소은 | Nginx를 통한 FrontEnd 배포(build) | ver_0.2 |


------

**Version** : 0.2

**Date** : 21.08.06 (금)

**Author** : 이소은

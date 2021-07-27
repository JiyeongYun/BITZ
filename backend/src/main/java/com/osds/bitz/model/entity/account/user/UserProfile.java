package com.osds.bitz.model.entity.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="userprofile")
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // 유저ID

    @Column(nullable = false)
    private String name;        // 이름

    @Column(nullable = false)
    private String nickname;    // 닉네임

    @Column(nullable = false)
    private String phone;       // 휴대폰번호

    @Column(nullable = false)
    private String location;    // 주소

    @Column(nullable = false)
    private int height;         // 키

    @Column(nullable = false)
    private String userId;      // 사용자ID

}

/*


- 어노테이션 5개 추가

- entity name mapping

- id 값 (Long, char 구별 + @GaneratedValue 추가)

- notnull 체크하기

- column 명 + 타입 맞는지 확인하기

주석 정리

checkList
- column명이 모두 일치하게끔 연결됐는가?
*/
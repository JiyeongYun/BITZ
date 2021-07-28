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

    private String nickname;    // 닉네임

    @Column(nullable = false)
    private String phone;       // 휴대폰번호

    private String location;    // 주소

    private int height;         // 키

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;
}

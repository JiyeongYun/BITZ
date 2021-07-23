package com.osds.bitz.model.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="userProfile")
public class UserProfile {

    @Id
    private String uID; // 유저ID

    @Column
    private String name; // 이름
    private String nickName; // 닉네임
    private String phone; // 휴대폰번호
    private String location; // 주소
    private int height; // 키

}

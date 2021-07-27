package com.osds.bitz.model.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="userauth")
@Builder
public class UserAuth {

    @Id
    private String id;          // 유저ID

    @Column(nullable = false)
    private String email;       // 이메일(아이디)
    @Column(nullable = false)
    private String password;    // 비밀번호
    @Column(nullable = false)
    private String birth;       // 생년월일

}

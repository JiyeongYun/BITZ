package com.osds.bitz.model.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="userAuth")
public class UserAuth {

    @Id
    private String uID; // 유저ID

    @Column
    private String email; // 이메일(아이디)
    private String password; // 비밀번호
    private String birth; // 생년월일

}

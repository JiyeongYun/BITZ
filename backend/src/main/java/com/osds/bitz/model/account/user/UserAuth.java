package com.osds.bitz.model.account.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="userauth")
@Builder
public class UserAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 유저ID

    @Column
    private String email; // 이메일(아이디)
    private String password; // 비밀번호
    private String birth; // 생년월일

}

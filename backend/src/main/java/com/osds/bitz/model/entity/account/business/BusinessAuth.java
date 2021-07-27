package com.osds.bitz.model.entity.account.business;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="businessauth")
@Builder
public class BusinessAuth {

    @Id
    private String id;          // 사업자ID

    @Column(nullable = false)
    private String email;       // 이메일(아이디)

    @Column(nullable = false)
    private String password;    // 비밀번호

    @Column(nullable = false)
    private String birth;       // 생년월일

}

package com.osds.bitz.model.entity.log;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="loginlog")
@Builder
public class LoginLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 접속자ID

    @Column(nullable = false)
    private String userEmail;      // 사용자 이메일

    @Column(nullable = false)
    private boolean isGeneral;  // 일반사용자여부

}

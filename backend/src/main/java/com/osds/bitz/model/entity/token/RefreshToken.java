package com.osds.bitz.model.entity.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "refreshtoken")
@Builder
public class RefreshToken {
    @Id
    private String userEmail;           // email

    @Column(nullable = false)
    private String value;               // Refresh token 값

    @Column(nullable = false)
    private boolean isGeneral;          // 일반 사용자 여부

    @Column(nullable = false)
    private LocalDateTime createdAt;    // 토큰 생성시간

    private LocalDateTime updatedAt;    // 토큰 수정시간

}

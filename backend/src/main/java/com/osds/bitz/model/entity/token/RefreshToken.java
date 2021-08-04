package com.osds.bitz.model.entity.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String key; // uid

    private String value; // Refresh token 값

    private LocalDateTime createdAt; // 토큰 생성시간

    private LocalDateTime updatedAt; // 토큰 수정시간

}

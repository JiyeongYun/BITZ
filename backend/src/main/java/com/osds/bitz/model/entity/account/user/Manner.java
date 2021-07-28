package com.osds.bitz.model.entity.account.user;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="manner")
@Builder
public class Manner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 매너점수ID

    @Column(nullable = false)
    private String userId;      // 유저ID

    @Column(nullable = false)
    private String recordId;    // 기록자ID

    private int score;          // 점수

    @Column(nullable = false)
    private LocalDateTime date; // 기록날짜

}
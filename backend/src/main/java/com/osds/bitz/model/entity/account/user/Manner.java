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

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;  // 사용자ID

    private int score;          // 점수

    @Column(nullable = false)
    private LocalDateTime date; // 기록날짜

    private String recordId;

}
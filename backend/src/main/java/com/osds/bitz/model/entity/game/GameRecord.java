package com.osds.bitz.model.entity.game;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gamerecord")
@Builder
public class GameRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // 게임기록ID

    @Column(nullable = false)
    private int team;                   // 팀

    @Column(nullable = false)
    private int quarter;                // 쿼터

    @Column(nullable = false)
    private int score;                  // 점수

    @Column(nullable = false)
    private LocalDateTime recordTime;   // 기록시간

    @Column(nullable = false)
    private String userId;              // 사용자ID

    @Column(nullable = false)
    private Long gameId;                // 게임ID

}

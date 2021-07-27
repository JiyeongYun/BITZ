package com.osds.bitz.model.entity.game;

import lombok.*;

import javax.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="game")
@Builder
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // 게임ID

    @Column(nullable = false)
    private Date date; // 날짜

    @Column(nullable = false)
    private Long gymId; // 체육관ID

    @Column(nullable = false)
    private Time startTime; // 시작시간

    @Column(nullable = false)
    private Time endTime; // 종료시간

    @Column(nullable = false)
    private int minPeople; // 최소인원

    @Column(nullable = false)
    private int maxPeople; // 최대인원

    @Column(nullable = false)
    private int participant; // 참가인원

    private int quarter; // 쿼터

}

package com.osds.bitz.model.game;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gameRecord")
public class GameRecord {

    @EmbeddedId
    private GameRecordPK gameRecordPK;

    @Column
    private String gameID; // 게임ID
    private int team; // 팀
    private int quarter; // 쿼터
    private int score; // 점수
    private String uID; // 유저ID(기록자)
    private LocalDateTime recordTime; // 기록시간

}

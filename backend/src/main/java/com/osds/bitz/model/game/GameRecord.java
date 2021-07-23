package com.osds.bitz.model.game;

import java.time.LocalDateTime;

public class GameRecord {

    private String gameID; // 게임ID
    private int team; // 팀
    private int quarter; // 쿼터
    private int score; // 점수
    private String uID; // 유저ID(기록자)
    private LocalDateTime recordTime; // 기록시간
}

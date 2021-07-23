package com.osds.bitz.model.game;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gameParticipant")
public class GameParticipant {

    @Id
    // PK

    @Column
    private String gameID; // 게임ID
    private String uID; // 유저ID
    private int state; // 상태
    private int team; // 팀

}

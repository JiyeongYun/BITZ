package com.osds.bitz.model.game;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class GamePK implements Serializable{

    private String gameID; // 게임ID
    private String gymID; // 체육관ID


}

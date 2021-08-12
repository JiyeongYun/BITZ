package com.osds.bitz.model.network.response.game;

import com.osds.bitz.model.entity.game.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameResponse {
    private String gymName;
    private Date date;
    private Time startTime;
    private Time endTime;
    private int minPeople;
    private int maxPeople;
    private int participationFee;

    public GameResponse(Game game){

        this.date = game.getDate();
        this.startTime = game.getStartTime();
        this.endTime = endTime;
        this.minPeople = minPeople;
        this.maxPeople = maxPeople;
        this.participationFee = participationFee;
    }

}

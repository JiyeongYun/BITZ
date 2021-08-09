package com.osds.bitz.model.network.request.gym;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameRequest {

    private long gameId;
    private String gymName;
    private Date date;
    private Time startTime;
    private Time endTime;
    private int minPeople;
    private int maxPeople;
    private int participationFee;

}

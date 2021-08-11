package com.osds.bitz.model.network.request.gym;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameRequest {

    @NotEmpty
    private long gameId;

    @NotEmpty
    private String gymName;

    @NotEmpty
    private Date date;

    @NotEmpty
    private Time startTime;

    @NotEmpty
    private Time endTime;

    @NotEmpty
    private int minPeople;

    @NotEmpty
    private int maxPeople;

    @NotEmpty
    private int participationFee;

}

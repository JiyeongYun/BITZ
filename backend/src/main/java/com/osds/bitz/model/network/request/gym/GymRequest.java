package com.osds.bitz.model.network.request.gym;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymRequest {

    @NotEmpty
    private String businessEmail;

    @NotEmpty
    private String name;

    @NotEmpty
    private String address;

    @NotEmpty
    private String sido;

    @NotEmpty
    private String gugun;

    @NotEmpty
    private int courtWidth;

    @NotEmpty
    private int courtLength;

    @NotEmpty
    private boolean isParking;

    @NotEmpty
    private boolean isShower;

    @NotEmpty
    private boolean isAirconditional;

    @NotEmpty
    private boolean isWater;

    @NotEmpty
    private boolean isBasketball;

    @NotEmpty
    private boolean isScoreboard;

    private String intro;

    private String notice;

}

package com.osds.bitz.model.network.response;

import com.osds.bitz.model.entity.gym.Gym;

public class GymResponse {

    private Long id;
    private String businessId;
    private String name;
    private String address;
    private int courtWidth;
    private int courtLength;
    private boolean isParking;
    private boolean isShower;
    private boolean isAirconditional;
    private boolean isWater;
    private boolean isBasketball;
    private boolean isScoreboard;

    public GymResponse(Gym gym) {
        this.id = id;
        this.businessId = businessId;
        this.name = name;
        this.address = address;
        this.courtWidth = courtWidth;
        this.courtLength = courtLength;
        this.isParking = isParking;
        this.isShower = isShower;
        this.isAirconditional = isAirconditional;
        this.isWater = isWater;
        this.isBasketball = isBasketball;
        this.isScoreboard = isScoreboard;
    }
}

package com.osds.bitz.model.network.request.gym;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymRequest {

    private String businessEmail;
    private String name;
    private String address;
    private int courtWidth;
    private int courtLenth;
    private boolean isParking;
    private boolean isShower;
    private boolean isAirconditional;
    private boolean isWater;
    private boolean isBasketball;
    private boolean isScoreboard;

}

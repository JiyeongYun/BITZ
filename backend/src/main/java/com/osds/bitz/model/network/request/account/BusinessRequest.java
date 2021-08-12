package com.osds.bitz.model.network.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.bitz.model.entity.account.business.BusinessAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessRequest {

    private BusinessAuth businessAuth;

    private String email;

    private String password;

    private String birth;

    private String name;

    private String phone;

    private String bank;

    private String account;

    private String address;

    private String intro;

    private String notice;

    private int courtWidth;

    private int courtLength;

    private boolean isParking;

    private boolean isShower;

    private boolean isAirconditional;

    private boolean isWater;

    private boolean isBasketball;

    private boolean isScoreboard;

}

package com.osds.bitz.model.network.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.bitz.model.entity.account.business.BusinessAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessRequest {

    @NotEmpty
    private BusinessAuth businessAuth;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String birth;

    @NotEmpty
    private String name;

    @NotEmpty
    private String phone;

    @NotEmpty
    private String bank;

    @NotEmpty
    private String account;

    @NotEmpty
    private MultipartFile businessRegistration;

    @NotEmpty
    private String address;

    @NotEmpty
    private String intro;

    @NotEmpty
    private String notice;

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

}

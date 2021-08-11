package com.osds.bitz.model.network.response.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.bitz.model.entity.gym.Gym;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessResponse {
    private String id;
    private String email;
    private String password;
    private String birth;
    private String phone;
    private String name;
    private String bank;
    private String account;
    private ArrayList<Gym> gymProfile;
}

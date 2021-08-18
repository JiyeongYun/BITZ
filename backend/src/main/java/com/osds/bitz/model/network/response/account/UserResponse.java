package com.osds.bitz.model.network.response.account;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    private String birth;
    private int height;
    private boolean guard;
    private boolean forward;
    private boolean center;
    private String sido1;
    private String gugun1;
    private String sido2;
    private String gugun2;
    private String sido3;
    private String gugun3;
    private double skill;
    private double manner;
    private int winCnt;
    private int loseCnt;
    private int tieCnt;

}

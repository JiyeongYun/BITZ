package com.osds.bitz.model.network.request;


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
public class UserRequest {

    private String email;
    private String password;
    private String birth;
    private String name;
    private String nickname;
    private String phone;
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

}

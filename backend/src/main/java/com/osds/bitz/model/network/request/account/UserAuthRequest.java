package com.osds.bitz.model.network.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserAuthRequest {

    private String email;

    private String password;

    private String name;

    private String nickname;

    private String phone;

    private String birth;

}

package com.osds.bitz.model.network.response.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.bitz.model.entity.account.business.BusinessAuth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusinessAuthResponse {

    private String email;
    private String password;
    private String birth;

    public BusinessAuthResponse(BusinessAuth businessAuth) {
        this.email = businessAuth.getEmail();
        this.password = businessAuth.getPassword();
        this.birth = businessAuth.getBirth();
    }

}

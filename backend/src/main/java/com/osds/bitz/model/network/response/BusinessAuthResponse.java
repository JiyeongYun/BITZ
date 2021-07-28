package com.osds.bitz.model.network.response;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessAuthResponse {

    private String id;
    private String email;
    private String password;
    private String birth;

    public BusinessAuthResponse(BusinessAuth businessAuth) {
        this.id = businessAuth.getId();
        this.email = businessAuth.getEmail();
        this.password = businessAuth.getPassword();
        this.birth = businessAuth.getBirth();
    }

}

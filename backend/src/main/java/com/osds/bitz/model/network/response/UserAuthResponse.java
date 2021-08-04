package com.osds.bitz.model.network.response;

import com.osds.bitz.model.entity.account.user.UserAuth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuthResponse {

    private String id;
    private String email;
    private String password;
    private String birth;
    private String accesstoken;

    public UserAuthResponse(UserAuth userAuth){
        this.id = userAuth.getId();
        this.email = userAuth.getEmail();
        this.password = userAuth.getPassword();
        this.birth = userAuth.getBirth();
    }
}

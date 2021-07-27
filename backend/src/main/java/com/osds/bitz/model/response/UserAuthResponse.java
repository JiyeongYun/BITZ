package com.osds.bitz.model.response;

import com.osds.bitz.model.account.user.UserAuth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthResponse {

    private String id;
    private String email;
    private String password;
    private String birth;

    public UserAuthResponse(UserAuth userAuth){
        this.id = userAuth.getId();
        this.email = userAuth.getEmail();
        this.password = userAuth.getPassword();
        this.birth = userAuth.getBirth();
    }
}

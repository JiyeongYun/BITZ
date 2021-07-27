package com.osds.bitz.model.network.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthRequest {

    private String email;
    private String password;
    private String birth;

}

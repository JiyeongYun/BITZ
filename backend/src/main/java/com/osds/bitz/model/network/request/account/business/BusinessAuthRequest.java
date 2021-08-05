package com.osds.bitz.model.network.request.account.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessAuthRequest {

    private String name;
    private String phone;
    private String email;
    private String password;
    private String birth;
    private String bank;
    private String account;
    private MultipartFile businessRegistration;

}

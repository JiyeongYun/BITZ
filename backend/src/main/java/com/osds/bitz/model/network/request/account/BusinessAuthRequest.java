package com.osds.bitz.model.network.request.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessAuthRequest {

    @NotEmpty
    private String name;

    @NotEmpty
    private String phone;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String birth;

    @NotEmpty
    private String bank;

    @NotEmpty
    private String account;

    @NotEmpty
    private MultipartFile businessRegistration;

}

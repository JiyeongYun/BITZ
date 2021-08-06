package com.osds.bitz.model.network.request.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReadAuthRequest {
    private String email;
    private String password;
}

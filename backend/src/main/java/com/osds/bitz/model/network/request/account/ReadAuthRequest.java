package com.osds.bitz.model.network.request.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReadAuthRequest {
    @NotEmpty
    private String email;

    @NotEmpty
    private String password;
}

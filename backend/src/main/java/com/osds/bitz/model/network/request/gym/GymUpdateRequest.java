package com.osds.bitz.model.network.request.gym;

import com.osds.bitz.model.entity.gym.Gym;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymUpdateRequest {

    @NotEmpty
    private String BusinessEmail;

    @NotEmpty
    private Gym gym;
}

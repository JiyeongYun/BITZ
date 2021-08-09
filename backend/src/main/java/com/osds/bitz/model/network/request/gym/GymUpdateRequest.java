package com.osds.bitz.model.network.request.gym;

import com.osds.bitz.model.entity.gym.Gym;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GymUpdateRequest {

    private String BusinessEmail;
    private Gym gym;
}

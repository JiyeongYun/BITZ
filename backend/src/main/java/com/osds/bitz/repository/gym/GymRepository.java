package com.osds.bitz.repository.gym;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface GymRepository extends JpaRepository<Gym, Long> {
    Gym getGymByName(String name);

    Gym getGymById(Long id);

    ArrayList<Gym> getGymsByBusinessAuth(BusinessAuth businessAuth);

    Gym getGymByBusinessAuth(BusinessAuth businessAuth);
}
